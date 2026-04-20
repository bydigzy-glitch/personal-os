-- Create friendships table
CREATE TABLE public.friendships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    addressee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT prevent_self_friend CHECK (requester_id != addressee_id),
    CONSTRAINT unique_friendship UNIQUE (requester_id, addressee_id)
);

-- Indexes for performance
CREATE INDEX idx_friendships_requester ON public.friendships(requester_id);
CREATE INDEX idx_friendships_addressee ON public.friendships(addressee_id);
CREATE INDEX idx_friendships_status ON public.friendships(status);

-- Enable RLS
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. View: Users can view their own friendships
CREATE POLICY "Users can view own friendships"
    ON public.friendships FOR SELECT
    USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- 2. Insert: Users can create friend requests
CREATE POLICY "Users can create friend requests"
    ON public.friendships FOR INSERT
    WITH CHECK (auth.uid() = requester_id);

-- 3. Update: Users can update status if they are involved
-- requesters can cancel (pending -> deleted) or block? Actually mostly addressees accept/decline.
CREATE POLICY "Users can update own friendships"
    ON public.friendships FOR UPDATE
    USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- Function to get or create a DM conversation
CREATE OR REPLACE FUNCTION public.get_or_create_dm_conversation(target_user_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    conversation_id UUID;
    current_user_id UUID;
BEGIN
    current_user_id := auth.uid();

    -- Check if a DM already exists between these two users
    -- We look for a conversation of type 'dm' that has BOTH participants
    SELECT c.id INTO conversation_id
    FROM conversations c
    JOIN conversation_participants cp1 ON c.id = cp1.conversation_id
    JOIN conversation_participants cp2 ON c.id = cp2.conversation_id
    WHERE c.type = 'dm'
      AND cp1.user_id = current_user_id
      AND cp2.user_id = target_user_id
    LIMIT 1;

    -- If found, return it
    IF conversation_id IS NOT NULL THEN
        RETURN conversation_id;
    END IF;

    -- If not found, create new conversation
    INSERT INTO conversations (type, created_by)
    VALUES ('dm', current_user_id)
    RETURNING id INTO conversation_id;

    -- Add participants
    INSERT INTO conversation_participants (conversation_id, user_id)
    VALUES 
        (conversation_id, current_user_id),
        (conversation_id, target_user_id);

    RETURN conversation_id;
END;
$$;
