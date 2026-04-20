-- Add email column to public.users
ALTER TABLE public.users ADD COLUMN email TEXT;

-- Create a function to sync email from auth.users on insert/update
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, display_name, avatar_url, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The trigger "on_auth_user_created" already exists (likely in 001 or implicitly). 
-- We might need to replace it or just backfill. 

-- Let's update the existing users first (Backfill)
UPDATE public.users u
SET email = au.email
FROM auth.users au
WHERE u.id = au.id;

-- Make email searchable? 
-- We might want an index
CREATE INDEX idx_users_email ON public.users(email);

-- Modify RLS to allow reading email? 
-- By default "Users can view own profile" is 001. 
-- We need users to be able to find OTHER users by email.
-- So we need a policy "Users can read basic info of others".
-- But maybe hide email? If we search by exact match, we need select permission.
-- Let's allow authenticated users to read public.users.
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view all profiles" 
ON public.users FOR SELECT 
TO authenticated 
USING (true);
