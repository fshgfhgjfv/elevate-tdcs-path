
-- Fix hardware_orders INSERT policy: drop restrictive, create permissive
DROP POLICY IF EXISTS "Anyone can create orders" ON public.hardware_orders;
CREATE POLICY "Anyone can create orders"
ON public.hardware_orders
FOR INSERT
TO public
WITH CHECK (true);

-- Fix payment_submissions INSERT policy: drop restrictive, create permissive
DROP POLICY IF EXISTS "Students can insert their own payment submissions" ON public.payment_submissions;
CREATE POLICY "Authenticated users can insert payment submissions"
ON public.payment_submissions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Fix hardware_orders SELECT policies: make them permissive
DROP POLICY IF EXISTS "Users can view their own orders" ON public.hardware_orders;
CREATE POLICY "Users can view their own orders"
ON public.hardware_orders
FOR SELECT
TO authenticated
USING ((auth.uid() = user_id) OR (email = (SELECT email FROM auth.users WHERE id = auth.uid())::text));

-- Fix hardware_orders UPDATE policy: make permissive
DROP POLICY IF EXISTS "Admins can update orders" ON public.hardware_orders;
CREATE POLICY "Admins can update orders"
ON public.hardware_orders
FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role));

-- Fix payment_submissions SELECT policies: make permissive
DROP POLICY IF EXISTS "Students can view their own submissions" ON public.payment_submissions;
CREATE POLICY "Students can view their own submissions"
ON public.payment_submissions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all payment submissions" ON public.payment_submissions;
CREATE POLICY "Admins can view all payment submissions"
ON public.payment_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update payment submissions" ON public.payment_submissions;
CREATE POLICY "Admins can update payment submissions"
ON public.payment_submissions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
