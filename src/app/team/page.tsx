'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { useTeam } from '@/hooks/use-team'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { TeamHeader } from '@/components/team/team-header'
import { MemberList } from '@/components/team/member-list'
import { TeamTasks } from '@/components/team/team-tasks'
import { TeamChat } from '@/components/team/team-chat'
import { TeamLeaderboard } from '@/components/team/team-leaderboard'
import { TeamEvents } from '@/components/team/team-events'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function TeamPage() {
    const { team, members, role, loading } = useTeam()
    const [userId, setUserId] = useState<string | null>(null)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUserId(data.user?.id || null)
        })
    }, [supabase])

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
            </DashboardLayout>
        )
    }

    if (!team) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center space-y-4">
                    <div className="bg-gray-100 p-6 rounded-full mb-2">
                        <Plus className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold font-heading">You are not part of a team yet</h2>
                    <p className="text-gray-500 max-w-sm">Create a new team to start collaborating with others, or ask an admin to invite you.</p>
                    <Button className="bg-black hover:bg-gray-800 text-white">
                        Create Team
                    </Button>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="relative min-h-[calc(100vh-64px)]">
                {/* Main Content Area */}
                <div className="p-6 space-y-6 xl:mr-80 pb-20">
                    {/* Header */}
                    <TeamHeader team={team} members={members} role={role} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Col: Members */}
                        <div className="space-y-6">
                            <MemberList members={members} />
                            <TeamLeaderboard members={members} />
                        </div>

                        {/* Middle Col: Tasks */}
                        <div className="lg:col-span-2 space-y-6">
                            <TeamEvents teamId={team.id} />
                            <TeamTasks teamId={team.id} />
                        </div>
                    </div>
                </div>

                {/* Right Panel: Chat */}
                {userId && (
                    <div className="fixed right-0 top-16 bottom-0 w-80 border-l border-gray-200 bg-white hidden xl:flex flex-col z-20 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
                        <TeamChat teamId={team.id} currentUserId={userId} />
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
