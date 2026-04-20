"use client"

import { Check, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFriendships } from "@/hooks/use-friendships"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function FriendRequestList() {
    const { pendingRequests, respondToRequest } = useFriendships()

    if (pendingRequests.length === 0) return null

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Friend Requests</h3>
            <div className="space-y-3">
                {pendingRequests.map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarImage src={req.friend?.avatar_url || undefined} />
                                <AvatarFallback>{req.friend?.display_name?.slice(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">{req.friend?.display_name || 'Unknown User'}</p>
                                <p className="text-xs text-muted-foreground">wants to be friends</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => respondToRequest(req.id, true)}>
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => respondToRequest(req.id, false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
