"use client"

import { MessageSquare, MoreVertical, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useFriendships } from "@/hooks/use-friendships"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function FriendsList() {
    const { friends, loading } = useFriendships()
    const router = useRouter()
    const supabase = createClient()

    const handleMessage = async (friendId: string) => {
        // Optimistically redirect to /messages/dm/:userId
        // But ideally we want the CONVERSATION ID. 
        // We can fetch it or use the RPC. 
        // Let's use the RPC to get ID then redirect.

        const { data: conversationId, error } = await supabase
            .rpc('get_or_create_dm_conversation', { target_user_id: friendId })

        if (error) {
            console.error('Failed to get conversation:', error)
            return
        }

        router.push(`/messages?id=${conversationId}`)
    }

    if (loading) {
        return <div className="text-sm text-muted-foreground">Loading friends...</div>
    }

    if (friends.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">You haven't added any friends yet.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Friends ({friends.length})</h3>
            <div className="space-y-2">
                {friends.map((friendship) => (
                    <div key={friendship.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleMessage(friendship.friend!.id)}>
                            <div className="relative">
                                <Avatar>
                                    <AvatarImage src={friendship.friend?.avatar_url || undefined} />
                                    <AvatarFallback>{friendship.friend?.display_name?.slice(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                                </Avatar>
                                {/* Online indicator placeholder - can use presence hook later */}
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background bg-gray-400"></span>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none">{friendship.friend?.display_name || 'Unknown User'}</p>
                                <p className="text-xs text-muted-foreground">Offline</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="ghost" onClick={() => handleMessage(friendship.friend!.id)}>
                                <MessageSquare className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remove Friend
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
