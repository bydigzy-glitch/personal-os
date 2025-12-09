'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function MessagesPage() {
    const [conversations, setConversations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        async function fetchConversations() {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            // Fetch team chat for the user's team
            const { data: member } = await supabase
                .from('team_members')
                .select('team_id')
                .eq('user_id', user.id)
                .maybeSingle()

            if (member) {
                const { data: teamChats } = await supabase
                    .from('conversations')
                    .select('*')
                    .eq('team_id', member.team_id)

                if (teamChats) setConversations(teamChats)
            }
            setLoading(false)
        }
        fetchConversations()
    }, [supabase])

    return (
        <DashboardLayout>
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold font-heading">Messages</h1>
                    <Badge variant="secondary">{conversations.length} Active</Badge>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-10">Loading messages...</div>
                    ) : (
                        <>
                            {conversations.map(conv => (
                                <Card key={conv.id} className="cursor-pointer hover:border-black/20 transition-all" onClick={() => router.push(`/team`)}>
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <Avatar className="h-12 w-12 bg-blue-100 text-blue-600">
                                            <AvatarFallback className="font-bold">#</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-lg">{conv.title || 'Team Chat'}</h3>
                                            <p className="text-sm text-gray-500">View latest messages from your team</p>
                                        </div>
                                        <div className="ml-auto text-xs text-gray-400">
                                            {new Date(conv.updated_at).toLocaleDateString()}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {conversations.length === 0 && (
                                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                    <p className="text-gray-500">No conversations found.</p>
                                    <p className="text-sm text-gray-400 mt-1">Join a team to start chatting!</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
