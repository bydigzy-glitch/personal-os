-- Migration 002: Teams, Chat, and Tasks/Events

-- 1. Create Teams
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Team Members
CREATE TYPE public.team_role AS ENUM ('owner', 'admin', 'member');

CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role public.team_role NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(team_id, user_id)
);

-- 3. Create Team Invites
CREATE TYPE public.invite_status AS ENUM ('pending', 'accepted', 'declined', 'expired');

CREATE TABLE public.team_invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  inviter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  invitee_email TEXT, -- Can be email or username, usually email for invites
  status public.invite_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days')
);

-- 4. Create Tasks (Since they were missing in 001 but required)
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  assigned_to_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL, -- Optional: link task to team
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Events (Since they were missing in 001 but required)
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.event_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'participant', -- host/participant
  status TEXT DEFAULT 'pending', -- pending/accepted/declined
  UNIQUE(event_id, user_id)
);

-- 6. Team Chat Tables
CREATE TYPE public.conversation_type AS ENUM ('team', 'dm', 'group');

CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  type public.conversation_type NOT NULL DEFAULT 'team',
  title TEXT,
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.conversation_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(conversation_id, user_id)
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- 7. Activity Log
CREATE TYPE public.activity_type AS ENUM ('task_completed', 'event_created', 'event_attended', 'message_sent');

CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type public.activity_type NOT NULL,
  target_id UUID, -- Generic ID reference to task/event/message
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to_user_id);
CREATE INDEX idx_tasks_team_id ON public.tasks(team_id);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_activity_log_team_id ON public.activity_log(team_id);

-- Enable RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Teams: Visible to members
CREATE POLICY "Team members can view teams" ON public.teams
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.team_members WHERE team_id = public.teams.id AND user_id = auth.uid()) 
    OR owner_id = auth.uid()
  );
  
CREATE POLICY "Owners can update teams" ON public.teams
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Owners can create teams" ON public.teams
  FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Team Members
CREATE POLICY "Members can view other members" ON public.team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = public.team_members.team_id AND tm.user_id = auth.uid()
    )
  );

-- Tasks
CREATE POLICY "Users can view assigned tasks" ON public.tasks
  FOR SELECT USING (
    assigned_to_user_id = auth.uid() OR created_by = auth.uid()
    OR (team_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.team_members WHERE team_id = public.tasks.team_id AND user_id = auth.uid()))
  );
  
CREATE POLICY "Users can create tasks" ON public.tasks
  FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update assigned tasks" ON public.tasks
  FOR UPDATE USING (
    assigned_to_user_id = auth.uid() OR created_by = auth.uid()
    OR (team_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.team_members WHERE team_id = public.tasks.team_id AND user_id = auth.uid()))
  );

-- Events
CREATE POLICY "Users can view team events" ON public.events
  FOR SELECT USING (
    created_by = auth.uid()
    OR (team_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.team_members WHERE team_id = public.events.team_id AND user_id = auth.uid()))
  );

-- Chat
CREATE POLICY "Participants can view conversations" ON public.conversations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = public.conversations.id AND user_id = auth.uid())
    OR 
    (team_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.team_members WHERE team_id = public.conversations.team_id AND user_id = auth.uid()))
  );

CREATE POLICY "Participants can view messages" ON public.messages
  FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.conversation_participants cp 
        WHERE cp.conversation_id = public.messages.conversation_id AND cp.user_id = auth.uid()
    )
    OR
    EXISTS (
        SELECT 1 FROM public.conversations c
        JOIN public.team_members tm ON tm.team_id = c.team_id
        WHERE c.id = public.messages.conversation_id AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages" ON public.messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid()
  );

-- Activity Log
CREATE POLICY "Team members can view activity" ON public.activity_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.team_members WHERE team_id = public.activity_log.team_id AND user_id = auth.uid())
  );
