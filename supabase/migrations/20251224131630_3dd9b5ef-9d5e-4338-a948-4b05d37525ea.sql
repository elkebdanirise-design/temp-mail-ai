-- Fix the license_keys SELECT policy - only allow users to see keys they've redeemed
DROP POLICY IF EXISTS "Users can check if their key exists" ON public.license_keys;

-- Create a restrictive SELECT policy - users can only see their own redeemed keys
CREATE POLICY "Users can only view their own redeemed keys"
ON public.license_keys
FOR SELECT
TO authenticated
USING (used_by = auth.uid());

-- Add explicit DELETE policy to deny all deletes (making security intentions clear)
CREATE POLICY "No one can delete license keys"
ON public.license_keys
FOR DELETE
TO authenticated
USING (false);