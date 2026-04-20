'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Hash, MessageSquare, Plus, UserPlus } from 'lucide-react'
import { ChatWindow } from '@/components/chat/chat-window'
import { useFriendships } from '@/hooks/use-friendships'
import { AddFriendDialog } from '../../components/friends/add-friend-dialog'
import { FriendRequestList } from '../../components/friends/friend-request-list'
import { FriendsList } from '../../components/friends/friends-list'

export default function MessagesPage() {
    const supabase = createClient()
    const router = useRouter()
    const searchParams = useSearchParams()

    // State
    const [teamConversations, setTeamConversations] = useState<any[]>([])
    const [dmConversations, setDmConversations] = useState<any[]>([])
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [activeConversationId, setActiveConversationId] = useState<string | null>(searchParams.get('id'))
    const [loading, setLoading] = useState(true)

    // Derived
    const activeConversation =
        teamConversations.find(c => c.id === activeConversationId) ||
        dmConversations.find(c => c.id === activeConversationId)

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/auth/sign-in')
                return
            }
            setCurrentUserId(user.id)

            // 1. Fetch DMs (conversations of type 'dm' where user is a participant)
            const { data: dms } = await supabase
                .from('conversations')
                .select(`
                    id, type, updated_at,
                    conversation_participants!inner(user_id)
                `)
                .eq('type', 'dm')
                .eq('conversation_participants.user_id', user.id)

            // Note: The simple query above might filter correctly or might not depending on Supabase structure.
            // A safer way is to query participants directly then join conversations. 
            // Or rely on RLS if policies are set "Users can view conversations they are in".
            // Let's assume RLS allows select on conversations user is in. 

            // To get the OTHER participant's details, we need a smarter query or post-process.
            // We want "Inbox" style: "User B".

            // Improved DM Fetching via participants
            // const { data: myParticipations } = await supabase.from('conversation_participants').select('conversation_id').eq('user_id', user.id)
            // const myConvIds = myParticipations?.map(p => p.conversation_id) || []
            // Then fetch conversations IN myConvIds AND type 'dm'.

            // Let's grab all user conversations first
            const { data: userConvs, error: convError } = await supabase
                .from('conversations')
                .select(`
                    *,
                    conversation_participants (
                        user_id,
                        users ( display_name, avatar_url )
                    )
                `)
                .order('updated_at', { ascending: false })

            if (userConvs) {
                // Filter DMs vs Teams
                const teams = userConvs.filter(c => c.type === 'team' || c.type === 'group' || c.team_id)
                const dms = userConvs.filter(c => c.type === 'dm')

                // Format DMs to have a "title" which is the Other User's name
                const formattedDms = dms.map(dm => {
                    const otherParticipant = dm.conversation_participants.find((p: any) => p.user_id !== user.id)
                    const otherUser = otherParticipant?.users
                    return {
                        ...dm,
                        title: otherUser?.display_name || 'Unknown User',
                        avatar_url: otherUser?.avatar_url
                    }
                })

                setTeamConversations(teams)
                setDmConversations(formattedDms)

                // If no active conversation but we have DMs/Teams, maybe select first? Or stay empty.
                // If activeConversationId is set in URL, it updates automatically via param? 
                // We need to keep state in sync if URL changes? 
                // searchParams is a snapshot. We might need logic to listen to URL. 
                // For now we use the state initialized from URL.
            }

            setLoading(false)
        }

        init()
    }, [supabase, router])

    // Update active conversation when URL param changes
    useEffect(() => {
        const id = searchParams.get('id')
        if (id) setActiveConversationId(id)
    }, [searchParams])

    const handleSelectConversation = (id: string) => {
        setActiveConversationId(id)
        router.push(`/messages?id=${id}`) // Update URL directly
    }

    if (loading) return <DashboardLayout><div className="flex h-[calc(100vh-4rem)] items-center justify-center">Loading messages...</div></DashboardLayout>

    return (
        <DashboardLayout>
            <div className="flex h-[calc(100vh-4rem)] bg-background">
                {/* Sidebar */}
                <div className="w-80 border-r flex flex-col bg-muted/10">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="font-semibold px-2">Messages</h2>
                        <AddFriendDialog />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* Friend Requests */}
                        <FriendRequestList />

                        {/* Team Chats */}
                        {teamConversations.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="text-xs font-semibold text-muted-foreground px-2 uppercase tracking-wider">Team Chats</h3>
                                {teamConversations.map(conv => (
                                    <button
                                        key={conv.id}
                                        onClick={() => handleSelectConversation(conv.id)}
                                        className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 transition-colors ${activeConversationId === conv.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'
                                            }`}
                                    >
                                        <div className="bg-blue-100 text-blue-700 p-1.5 rounded-md">
                                            <Hash className="w-4 h-4" />
                                        </div>
                                        <span className="truncate">{conv.title}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Direct Messages */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Direct Messages</h3>
                            </div>
                            {dmConversations.length === 0 ? (
                                <p className="text-xs text-muted-foreground px-2 italic">No conversations yet</p>
                            ) : (
                                dmConversations.map(conv => (
                                    <button
                                        key={conv.id}
                                        onClick={() => handleSelectConversation(conv.id)}
                                        className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 transition-colors ${activeConversationId === conv.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'
                                            }`}
                                    >
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={conv.avatar_url} />
                                            <AvatarFallback>{conv.title.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span className="truncate">{conv.title}</span>
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Friends List (Bottom or Separate Tab?) - Let's put it at bottom for easy access to new DMs */}
                        <div className="pt-4 border-t">
                            <FriendsList />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {activeConversation ? (
                        <ChatWindow
                            conversationId={activeConversation.id}
                            title={activeConversation.title || 'Chat'}
                            type={activeConversation.type}
                            currentUserId={currentUserId!}
                        />
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                            <div className="bg-muted/50 p-4 rounded-full mb-4">
                                <MessageSquare className="w-8 h-8 opacity-50" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Your Messages</h3>
                            <p className="max-w-sm">
                                Select a conversation from the sidebar or find a friend to start chatting.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
