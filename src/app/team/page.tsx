'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { useTeam } from '@/hooks/use-team'
import { Button } from '@/components/ui/button'
import { Plus, Check, X } from 'lucide-react'
import { TeamHeader } from '@/components/team/team-header'
import { MemberList } from '@/components/team/member-list'
import { TeamTasks } from '@/components/team/team-tasks'
import { TeamChat } from '@/components/team/team-chat'
import { TeamLeaderboard } from '@/components/team/team-leaderboard'
import { TeamEvents } from '@/components/team/team-events'
import { CreateTeamDialog } from '@/components/team/create-team-dialog'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'

export default function TeamPage() {
    const { team, members, role, loading } = useTeam()
    const [userId, setUserId] = useState<string | null>(null)
    const [invites, setInvites] = useState<any[]>([])
    const supabase = createClient()

    useEffect(() => {
        async function init() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserId(user.id)
                if (user.email) {
                    // Fetch pending invites
                    const { data: userInvites } = await supabase
                        .from('team_invites')
                        .select('*, team:teams(name)')
                        .eq('invitee_email', user.email)
                        .eq('status', 'pending')

                    if (userInvites) setInvites(userInvites)
                }
            }
        }
        init()
    }, [supabase])

    const handleAcceptInvite = async (invite: any) => {
        try {
            // 1. Update invite status
            await supabase.from('team_invites').update({ status: 'accepted' }).eq('id', invite.id)

            // 2. Create member
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                await supabase.from('team_members').insert({
                    team_id: invite.team_id,
                    user_id: user.id,
                    role: 'member'
                })
            }
            // 3. Reload to switch view
            window.location.reload()
        } catch (e) {
            console.error(e)
        }
    }

    const handleDeclineInvite = async (invite: any) => {
        await supabase.from('team_invites').update({ status: 'declined' }).eq('id', invite.id)
        setInvites(prev => prev.filter(i => i.id !== invite.id))
    }

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
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center space-y-4 p-8">
                    <div className="bg-gray-100 p-6 rounded-full mb-2">
                        <Plus className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold font-heading">You are not part of a team yet</h2>
                    <p className="text-gray-500 max-w-sm">Create a new team to start collaborating with others, or ask an admin to invite you.</p>
                    <div className="pt-2">
                        <CreateTeamDialog />
                    </div>

                    {invites.length > 0 && (
                        <div className="mt-12 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-gray-50 px-2 text-muted-foreground">Pending Invites</span>
                                </div>
                            </div>

                            <div className="space-y-3 mt-6">
                                {invites.map(invite => (
                                    <Card key={invite.id} className="text-left border-l-4 border-l-blue-500 overflow-hidden">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">Join <span className="font-bold">{invite.team?.name}</span></p>
                                                <p className="text-xs text-gray-500">Invited {new Date(invite.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeclineInvite(invite)}>
                                                    <X className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700" onClick={() => handleAcceptInvite(invite)}>
                                                    <Check className="w-4 h-4 mr-1" />
                                                    Accept
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
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
                            <TeamLeaderboard members={members} teamId={team.id} />
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
