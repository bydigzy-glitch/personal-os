'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/database.types'

type Team = Database['public']['Tables']['teams']['Row']
type TeamMember = Database['public']['Tables']['team_members']['Row'] & {
    users: Database['public']['Tables']['users']['Row']
}

export function useTeam() {
    const [team, setTeam] = useState<Team | null>(null)
    const [members, setMembers] = useState<TeamMember[]>([])
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchTeam() {
            setLoading(true)
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return

                // Get first team user belongs to
                const { data: memberData } = await supabase
                    .from('team_members')
                    .select('team_id, role')
                    .eq('user_id', user.id)
                    .maybeSingle()

                if (memberData) {
                    const { data: teamData } = await supabase
                        .from('teams')
                        .select('*')
                        .eq('id', memberData.team_id)
                        .single()

                    if (teamData) {
                        setTeam(teamData)
                        setRole(memberData.role)

                        // Fetch all members
                        const { data: allMembers } = await supabase
                            .from('team_members')
                            .select('*, users(*)')
                            .eq('team_id', teamData.id)

                        if (allMembers) {
                            setMembers(allMembers as any)
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching team:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTeam()
    }, [supabase])

    return { team, members, role, loading }
}
