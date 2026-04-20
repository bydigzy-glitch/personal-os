"use client"

import { useState } from "react"
import { Check, Loader2, UserPlus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFriendships } from "@/hooks/use-friendships"
import { toast } from "sonner" // Assuming sonner is installed or will be used. If not, alert/console. 
// Just in case, I will stick to alert if sonner not setup, but improved experience suggests toast. 
// I'll check package.json for sonner later or just use window.alert for minimal deps? 
// Actually I'll use simple state message.

export function AddFriendDialog() {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const { sendFriendRequest } = useFriendships()
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setStatus('idle')
        setMessage('')

        try {
            await sendFriendRequest(email)
            setStatus('success')
            setMessage('Friend request sent!')
            setEmail("")
            setTimeout(() => setOpen(false), 1500)
        } catch (error: any) {
            console.error(error)
            setStatus('error')
            setMessage(error.message || 'Failed to send request')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Friend
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a Friend</DialogTitle>
                    <DialogDescription>
                        Enter their email address to send a friend request.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSend} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            placeholder="friend@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    {status === 'success' && (
                        <div className="text-sm text-green-600 flex items-center">
                            <Check className="w-4 h-4 mr-1" /> {message}
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="text-sm text-red-600 flex items-center">
                            <X className="w-4 h-4 mr-1" /> {message}
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" disabled={loading || !email}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Request
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
