-- Create payment_submissions table
CREATE TABLE public.payment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_name TEXT NOT NULL,
  amount_paid NUMERIC NOT NULL,
  transaction_id TEXT NOT NULL,
  screenshot_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course_access table
CREATE TABLE public.course_access (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_name TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_name)
);

-- Create course_recordings table
CREATE TABLE public.course_recordings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_name TEXT NOT NULL,
  title TEXT NOT NULL,
  recording_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.payment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_recordings ENABLE ROW LEVEL SECURITY;

-- Payment Submissions Policies
CREATE POLICY "Students can insert their own payment submissions"
ON public.payment_submissions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can view their own submissions"
ON public.payment_submissions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all payment submissions"
ON public.payment_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update payment submissions"
ON public.payment_submissions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Course Access Policies
CREATE POLICY "Students can view their own course access"
ON public.course_access
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all course access"
ON public.course_access
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert course access"
ON public.course_access
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete course access"
ON public.course_access
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Course Recordings Policies
CREATE POLICY "Students can view recordings for unlocked courses"
ON public.course_recordings
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.course_access
    WHERE course_access.user_id = auth.uid()
    AND course_access.course_name = course_recordings.course_name
  )
);

CREATE POLICY "Admins can view all recordings"
ON public.course_recordings
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert recordings"
ON public.course_recordings
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update recordings"
ON public.course_recordings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete recordings"
ON public.course_recordings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for auto-unlock when payment is verified
CREATE OR REPLACE FUNCTION public.handle_payment_verified()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'verified' AND (OLD.status IS NULL OR OLD.status != 'verified') THEN
    INSERT INTO public.course_access (user_id, course_name, unlocked_at)
    VALUES (NEW.user_id, NEW.course_name, now())
    ON CONFLICT (user_id, course_name) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER on_payment_verified
  AFTER UPDATE ON public.payment_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_payment_verified();