'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Database } from '@/lib/supabase/database.types'

type Profile = Database['public']['Tables']['users']['Row']

interface UpdateProfileFormProps {
    profile: Profile | null
    userEmail: string
}

export function UpdateProfileForm({ profile, userEmail }: UpdateProfileFormProps) {
    const [loading, setLoading] = useState(false)
    const [displayName, setDisplayName] = useState(profile?.display_name || '')
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        const { error } = await supabase
            .from('users')
            .update({
                display_name: displayName,
            })
            .eq('id', user.id)

        if (error) {
            console.error('Error updating profile:', error)
        } else {
            setSuccess(true)
            router.refresh()
            setTimeout(() => setSuccess(false), 3000)
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={userEmail}
                    disabled
                    className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">
                    Email cannot be changed
                </p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                    id="displayName"
                    type="text"
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={loading}
                />
            </div>

            {success && (
                <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg">
                    Profile updated successfully!
                </div>
            )}

            <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    )
}
