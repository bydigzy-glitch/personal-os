'use client'

import { useEffect, useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function TeamChat({ teamId, currentUserId }: { teamId: string, currentUserId: string }) {
    const [messages, setMessages] = useState<any[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [conversationId, setConversationId] = useState<string | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const supabase = createClient()

    // Fetch or create default conversation
    useEffect(() => {
        async function initChat() {
            if (!teamId) return

            // Find 'team' conversation
            let { data: conv } = await supabase
                .from('conversations')
                .select('id')
                .eq('team_id', teamId)
                .eq('type', 'team')
                .maybeSingle()

            // If strictly no conversation, we might need to create one (handled by backend triggers ideally, but MVP here)
            // Skipping creation logic for simplicity/permissions safety, assuming seed data or manual creation

            if (conv) {
                setConversationId(conv.id)

                // Fetch messages
                const { data: msgs } = await supabase
                    .from('messages')
                    .select('*, sender:users(display_name, avatar_url)')
                    .eq('conversation_id', conv.id)
                    .order('created_at', { ascending: true })
                    .limit(50)

                if (msgs) setMessages(msgs)

                // Subscribe to new messages
                const channel = supabase
                    .channel(`chat:${conv.id}`)
                    .on('postgres_changes', {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'messages',
                        filter: `conversation_id=eq.${conv.id}`
                    }, async (payload) => {
                        // Fetch sender details for the new message
                        const { data: sender } = await supabase
                            .from('users')
                            .select('display_name, avatar_url')
                            .eq('id', payload.new.sender_id)
                            .single()

                        const newMsg = { ...payload.new, sender }
                        setMessages(prev => [...prev, newMsg])
                    })
                    .subscribe()

                return () => {
                    supabase.removeChannel(channel)
                }
            }
        }
        initChat()
    }, [teamId, supabase])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !conversationId) return

        const content = newMessage
        setNewMessage('') // Optimistic clear

        const { error } = await supabase
            .from('messages')
            .insert({
                conversation_id: conversationId,
                sender_id: currentUserId,
                content: content
            })

        if (error) {
            console.error('Failed to send:', error)
            setNewMessage(content) // Revert on failure
        }
    }

    return (
        <div className="flex flex-col h-full bg-gray-50/50">
            <div className="p-4 border-b border-gray-200 bg-white">
                <h3 className="font-semibold text-gray-900">Team Chat</h3>
                <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Live
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 text-sm mt-10">
                        Say hello to your team! 👋
                    </div>
                )}
                {messages.map((msg, idx) => {
                    const isMe = msg.sender_id === currentUserId
                    // Ensure sender is not null to avoid crash
                    const displayName = msg.sender?.display_name || 'Unknown'
                    const avatarUrl = msg.sender?.avatar_url

                    return (
                        <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                            {!isMe && (
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarImage src={avatarUrl} />
                                    <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`max-w-[80%] rounded-lg p-3 text-sm shadow-sm ${isMe ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-900'
                                }`}>
                                {!isMe && (
                                    <div className="font-bold text-[10px] mb-1 opacity-70 uppercase tracking-wider">
                                        {displayName}
                                    </div>
                                )}
                                {msg.content}
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={sendMessage} className="flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!conversationId}>
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}
