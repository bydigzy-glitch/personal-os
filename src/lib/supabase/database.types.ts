export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    display_name: string | null
                    avatar_url: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    display_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    display_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                }
                Relationships: []
            }
            projects: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    status: 'active' | 'paused' | 'completed'
                    progress: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    description?: string | null
                    status?: 'active' | 'paused' | 'completed'
                    progress?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    description?: string | null
                    status?: 'active' | 'paused' | 'completed'
                    progress?: number
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'projects_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            files: {
                Row: {
                    id: string
                    user_id: string
                    project_id: string | null
                    name: string
                    type: string
                    supabase_path: string
                    created_at: string
                    size: number
                }
                Insert: {
                    id?: string
                    user_id: string
                    project_id?: string | null
                    name: string
                    type: string
                    supabase_path: string
                    created_at?: string
                    size?: number
                }
                Update: {
                    id?: string
                    user_id?: string
                    project_id?: string | null
                    name?: string
                    type?: string
                    supabase_path?: string
                    created_at?: string
                    size?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'files_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'files_project_id_fkey'
                        columns: ['project_id']
                        isOneToOne: false
                        referencedRelation: 'projects'
                        referencedColumns: ['id']
                    }
                ]
            }
            apps: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    category: string
                    description: string | null
                    icon: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    category: string
                    description?: string | null
                    icon?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    category?: string
                    description?: string | null
                    icon?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'apps_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            teams: {
                Row: {
                    id: string
                    owner_id: string
                    name: string
                    description: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    owner_id: string
                    name: string
                    description?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    owner_id?: string
                    name?: string
                    description?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'teams_owner_id_fkey'
                        columns: ['owner_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            team_members: {
                Row: {
                    id: string
                    team_id: string
                    user_id: string
                    role: 'owner' | 'admin' | 'member'
                    joined_at: string
                    is_active: boolean
                }
                Insert: {
                    id?: string
                    team_id: string
                    user_id: string
                    role?: 'owner' | 'admin' | 'member'
                    joined_at?: string
                    is_active?: boolean
                }
                Update: {
                    id?: string
                    team_id?: string
                    user_id?: string
                    role?: 'owner' | 'admin' | 'member'
                    joined_at?: string
                    is_active?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: 'team_members_team_id_fkey'
                        columns: ['team_id']
                        isOneToOne: false
                        referencedRelation: 'teams'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'team_members_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            },
            team_invites: {
                Row: {
                    id: string
                    team_id: string
                    inviter_id: string
                    invitee_email: string | null
                    status: 'pending' | 'accepted' | 'declined' | 'expired'
                    created_at: string
                    expires_at: string | null
                }
                Insert: {
                    id?: string
                    team_id: string
                    inviter_id: string
                    invitee_email?: string | null
                    status?: 'pending' | 'accepted' | 'declined' | 'expired'
                    created_at?: string
                    expires_at?: string | null
                }
                Update: {
                    id?: string
                    team_id?: string
                    inviter_id?: string
                    invitee_email?: string | null
                    status?: 'pending' | 'accepted' | 'declined' | 'expired'
                    created_at?: string
                    expires_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'team_invites_team_id_fkey'
                        columns: ['team_id']
                        isOneToOne: false
                        referencedRelation: 'teams'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'team_invites_inviter_id_fkey'
                        columns: ['inviter_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            },
            tasks: {
                Row: {
                    id: string
                    created_by: string
                    assigned_to_user_id: string | null
                    team_id: string | null
                    project_id: string | null
                    title: string
                    description: string | null
                    status: 'todo' | 'in_progress' | 'done'
                    due_date: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    created_by: string
                    assigned_to_user_id?: string | null
                    team_id?: string | null
                    project_id?: string | null
                    title: string
                    description?: string | null
                    status?: 'todo' | 'in_progress' | 'done'
                    due_date?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    created_by?: string
                    assigned_to_user_id?: string | null
                    team_id?: string | null
                    project_id?: string | null
                    title?: string
                    description?: string | null
                    status?: 'todo' | 'in_progress' | 'done'
                    due_date?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'tasks_assigned_to_user_id_fkey'
                        columns: ['assigned_to_user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            events: {
                Row: {
                    id: string
                    created_by: string
                    team_id: string | null
                    project_id: string | null
                    title: string
                    description: string | null
                    start_time: string
                    end_time: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    created_by: string
                    team_id?: string | null
                    project_id?: string | null
                    title: string
                    description?: string | null
                    start_time: string
                    end_time: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    created_by?: string
                    team_id?: string | null
                    project_id?: string | null
                    title?: string
                    description?: string | null
                    start_time?: string
                    end_time?: string
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            conversations: {
                Row: {
                    id: string
                    team_id: string | null
                    type: 'team' | 'dm' | 'group'
                    title: string | null
                    created_by: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    team_id?: string | null
                    type?: 'team' | 'dm' | 'group'
                    title?: string | null
                    created_by?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    team_id?: string | null
                    type?: 'team' | 'dm' | 'group'
                    title?: string | null
                    created_by?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            messages: {
                Row: {
                    id: string
                    conversation_id: string
                    sender_id: string
                    content: string
                    created_at: string
                    edited_at: string | null
                    deleted_at: string | null
                }
                Insert: {
                    id?: string
                    conversation_id: string
                    sender_id: string
                    content: string
                    created_at?: string
                    edited_at?: string | null
                    deleted_at?: string | null
                }
                Update: {
                    id?: string
                    conversation_id?: string
                    sender_id?: string
                    content?: string
                    created_at?: string
                    edited_at?: string | null
                    deleted_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'messages_sender_id_fkey'
                        columns: ['sender_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            activity_log: {
                Row: {
                    id: string
                    team_id: string
                    user_id: string
                    type: 'task_completed' | 'event_created' | 'event_attended' | 'message_sent'
                    target_id: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    team_id: string
                    user_id: string
                    type: 'task_completed' | 'event_created' | 'event_attended' | 'message_sent'
                    target_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    team_id?: string
                    user_id?: string
                    type: 'task_completed' | 'event_created' | 'event_attended' | 'message_sent'
                    target_id?: string | null
                    created_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_team_leaderboard: {
                Args: {
                    p_team_id: string
                }
                Returns: {
                    user_id: string
                    score: number
                }[]
            }
        }
        Enums: {
            project_status: 'active' | 'paused' | 'completed'
            team_role: 'owner' | 'admin' | 'member'
            invite_status: 'pending' | 'accepted' | 'declined' | 'expired'
            conversation_type: 'team' | 'dm' | 'group'
            activity_type: 'task_completed' | 'event_created' | 'event_attended' | 'message_sent'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
