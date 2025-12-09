'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Mail, Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function InviteMemberDialog({ teamId }: { teamId: string }) {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            // Create invite record
            const { error } = await supabase
                .from('team_invites')
                .insert({
                    team_id: teamId,
                    inviter_id: user.id,
                    invitee_email: email,
                    status: 'pending'
                })

            if (error) throw error

            setSuccess(true)
            setTimeout(() => {
                setOpen(false)
                setSuccess(false)
                setEmail('')
            }, 2000)

        } catch (error) {
            console.error('Failed to invite:', error)
            // In a real app, user would see a toast error here
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite to Team</DialogTitle>
                </DialogHeader>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-6 space-y-3">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <p className="text-center font-medium">Invitation sent!</p>
                        <p className="text-center text-sm text-gray-500">We sent an email to {email}</p>
                    </div>
                ) : (
                    <form onSubmit={handleInvite} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="colleague@example.com"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                They will receive an email with a link to join your team.
                            </p>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Send Invite
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
