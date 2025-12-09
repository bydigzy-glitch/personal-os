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
                }
                Insert: {
                    id?: string
                    user_id: string
                    project_id?: string | null
                    name: string
                    type: string
                    supabase_path: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    project_id?: string | null
                    name?: string
                    type?: string
                    supabase_path?: string
                    created_at?: string
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
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            project_status: 'active' | 'paused' | 'completed'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
