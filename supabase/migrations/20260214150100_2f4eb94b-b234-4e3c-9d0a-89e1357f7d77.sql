
-- Fix leads INSERT policy: change from restrictive to permissive so anonymous users can submit
DROP POLICY "Anyone can submit leads" ON public.leads;
CREATE POLICY "Anyone can submit leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
