'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, Bell, Shield, Palette } from 'lucide-react'

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: profile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                setUser(profile)
            }
        }
        getUser()
    }, [supabase])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate update
        setTimeout(() => setLoading(false), 1000)
    }

    return (
        <DashboardLayout user={user}>
            <div className="p-8 max-w-4xl mx-auto space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h2>
                    <p className="text-gray-500 mt-2">Manage your account settings and preferences.</p>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                <CardTitle>Profile Information</CardTitle>
                            </div>
                            <CardDescription>Update your public profile details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="displayName">Display Name</Label>
                                    <Input id="displayName" defaultValue={user?.display_name || ''} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" defaultValue={user?.email || 'user@example.com'} disabled />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Palette className="w-5 h-5 text-purple-600" />
                                <CardTitle>Appearance</CardTitle>
                            </div>
                            <CardDescription>Customize the look and feel of your workspace.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="font-medium">Theme</p>
                                    <p className="text-sm text-gray-500">Select your preferred color theme.</p>
                                </div>
                                <Button variant="outline">Light</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="w-5 h-5 text-yellow-600" />
                                <CardTitle>Notifications</CardTitle>
                            </div>
                            <CardDescription>Configure how you want to be notified.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">Notification settings coming soon.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
