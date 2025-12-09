'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function CreateTeamDialog() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            console.log('Starting team creation...')
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                console.error('No authenticated user found')
                alert('Please sign in to create a team')
                router.push('/auth/sign-in')
                return
            }

            console.log('User found:', user.id)

            // 1. Create Team
            const { data: team, error: teamError } = await supabase
                .from('teams')
                .insert({
                    name,
                    description,
                    owner_id: user.id
                })
                .select()
                .single()

            if (teamError) throw teamError

            // 2. Add creator as Owner
            const { error: memberError } = await supabase
                .from('team_members')
                .insert({
                    team_id: team.id,
                    user_id: user.id,
                    role: 'owner',
                    is_active: true
                })

            if (memberError) throw memberError

            // 3. Create default 'Team Chat'
            await supabase
                .from('conversations')
                .insert({
                    team_id: team.id,
                    type: 'team',
                    title: 'General',
                    created_by: user.id
                })

            setOpen(false)
            router.refresh()
            // Force reload to pick up new team state immediately since hooks run on mount
            window.location.reload()

        } catch (error: any) {
            console.error('Failed to create team:', error)
            alert(`Failed to create team. Error: ${error.message || JSON.stringify(error)}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Team
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a New Team</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Team Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Acme Corp, Design Squad"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Input
                            id="description"
                            placeholder="What's this team about?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Create Team
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
