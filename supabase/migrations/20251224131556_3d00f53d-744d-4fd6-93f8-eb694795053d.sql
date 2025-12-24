-- Create a function for atomic license key redemption to prevent race conditions
CREATE OR REPLACE FUNCTION public.redeem_license_key(
  key_to_redeem TEXT,
  redeeming_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  key_record RECORD;
BEGIN
  -- Lock the specific row for update to prevent race conditions
  SELECT * INTO key_record
  FROM public.license_keys
  WHERE license_key = key_to_redeem
  FOR UPDATE;
  
  -- Check if key exists
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid license key');
  END IF;
  
  -- Check if already used
  IF key_record.is_used THEN
    RETURN jsonb_build_object('success', false, 'error', 'This license key has already been redeemed');
  END IF;
  
  -- Atomically mark the key as used
  UPDATE public.license_keys
  SET 
    is_used = true, 
    used_by = redeeming_user_id, 
    used_at = NOW()
  WHERE license_key = key_to_redeem;
  
  -- Update the user's profile to is_pro: true
  UPDATE public.profiles
  SET 
    is_pro = true, 
    license_key = key_to_redeem, 
    activated_at = NOW(),
    updated_at = NOW()
  WHERE user_id = redeeming_user_id;
  
  RETURN jsonb_build_object('success', true);
END;
$$;