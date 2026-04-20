"use client"

import { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    content: string
    created_at: string
    user_id: string
    users: {
        display_name: string | null
        avatar_url: string | null
    }
}

interface ChatWindowProps {
    conversationId: string
    title: string
    type: 'dm' | 'team'
    currentUserId: string
}

export function ChatWindow({ conversationId, title, type, currentUserId }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)
    const supabase = createClient()

    useEffect(() => {
        // 1. Fetch initial messages
        const fetchMessages = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('messages')
                .select(`
          id,
          content,
          created_at,
          user_id,
          users (
            display_name,
            avatar_url
          )
        `)
                .eq('conversation_id', conversationId)
                .order('created_at', { ascending: true })

            if (error) {
                console.error('Error fetching messages:', error)
            } else {
                setMessages(data as any || [])
            }
            setLoading(false)
        }

        fetchMessages()

        // 2. Subscribe to new messages
        const channel = supabase
            .channel(`chat:${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${conversationId}`
                },
                async (payload) => {
                    // Fetch sender details for the new message
                    const { data: userData } = await supabase
                        .from('users')
                        .select('display_name, avatar_url')
                        .eq('id', payload.new.user_id)
                        .single()

                    const newMsg: Message = {
                        id: payload.new.id,
                        content: payload.new.content,
                        created_at: payload.new.created_at,
                        user_id: payload.new.user_id,
                        users: userData || { display_name: 'Unknown', avatar_url: null }
                    }
                    setMessages((prev) => [...prev, newMsg])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [conversationId, supabase])

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const handleSend = async () => {
        if (!newMessage.trim()) return

        const { error } = await supabase
            .from('messages')
            .insert({
                conversation_id: conversationId,
                user_id: currentUserId,
                content: newMessage.trim()
            })

        if (error) {
            console.error('Failed to send message:', error)
            alert('Failed to send')
        } else {
            setNewMessage("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="border-b p-4 flex items-center justify-between">
                <h2 className="font-semibold text-lg">{title}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center h-full text-muted-foreground">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-muted-foreground">No messages yet. Say hello!</div>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.user_id === currentUserId
                        return (
                            <div key={msg.id} className={cn("flex flex-col gap-1", isMe ? "items-end" : "items-start")}>
                                {!isMe && <span className="text-xs text-muted-foreground ml-1">{msg.users.display_name}</span>}
                                <div className={cn(
                                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                                    isMe ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                                )}>
                                    {msg.content}
                                </div>
                                <span className="text-[10px] text-muted-foreground opacity-70">
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        )
                    })
                )}
                <div ref={scrollRef} />
            </div>

            <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                    <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`Message ${title}...`}
                        className="min-h-[50px] max-h-[150px]"
                    />
                    <Button onClick={handleSend} size="icon" className="h-[50px] w-[50px]">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
