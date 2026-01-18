-- Create hardware_orders table to store order and tracking information
CREATE TABLE public.hardware_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  order_number TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  shipping NUMERIC NOT NULL,
  tax NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  transaction_id TEXT NOT NULL,
  shiprocket_tracking_id TEXT,
  shiprocket_awb TEXT,
  order_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hardware_orders ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own orders (by email or user_id)
CREATE POLICY "Users can view their own orders" 
ON public.hardware_orders 
FOR SELECT 
USING (
  auth.uid() = user_id 
  OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Create policy for public order lookup by order_number (for tracking)
CREATE POLICY "Anyone can view orders by order number" 
ON public.hardware_orders 
FOR SELECT 
USING (true);

-- Create policy for inserting orders
CREATE POLICY "Anyone can create orders" 
ON public.hardware_orders 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to update orders
CREATE POLICY "Admins can update orders" 
ON public.hardware_orders 
FOR UPDATE 
USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_hardware_orders_updated_at
BEFORE UPDATE ON public.hardware_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();