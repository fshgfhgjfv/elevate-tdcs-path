-- Fix the overly permissive hardware_orders RLS policy
-- Drop the dangerous "Anyone can view orders by order number" policy
DROP POLICY IF EXISTS "Anyone can view orders by order number" ON hardware_orders;

-- Create a secure edge function-based approach for order tracking
-- We'll create a function that validates order_number + email before returning data
CREATE OR REPLACE FUNCTION public.get_order_by_tracking(
  p_order_number text,
  p_email text
)
RETURNS SETOF hardware_orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate inputs
  IF p_order_number IS NULL OR p_email IS NULL THEN
    RETURN;
  END IF;
  
  -- Only return orders that match both order_number AND email
  RETURN QUERY
  SELECT *
  FROM hardware_orders
  WHERE order_number = p_order_number
    AND LOWER(email) = LOWER(p_email);
END;
$$;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.get_order_by_tracking(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_order_by_tracking(text, text) TO anon;