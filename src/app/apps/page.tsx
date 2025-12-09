'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, ExternalLink, Zap, Mail, Calendar, MessageSquare, Cloud } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'

const dummyApps = [
    { id: '1', name: 'Slack', description: 'Team communication and collaboration.', category: 'Communication', icon: MessageSquare, status: 'Connected' },
    { id: '2', name: 'Google Drive', description: 'Cloud storage and file management.', category: 'Storage', icon: Cloud, status: 'Connected' },
    { id: '3', name: 'Notion', description: 'All-in-one workspace for notes and tasks.', category: 'Productivity', icon: Zap, status: 'Not Connected' },
    { id: '4', name: 'Gmail', description: 'Email management and automation.', category: 'Communication', icon: Mail, status: 'Connected' },
    { id: '5', name: 'Google Calendar', description: 'Schedule meetings and events.', category: 'Productivity', icon: Calendar, status: 'Not Connected' },
]

export default function AppsPage() {
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()

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

    return (
        <DashboardLayout user={user}>
            <div className="p-8 max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Apps & Integrations</h2>
                        <p className="text-gray-500 mt-2">Connect your favorite tools to Personal OS.</p>
                    </div>
                    <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Request Integration
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyApps.map((app) => (
                        <Card key={app.id} className="hover:border-blue-300 transition-colors">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <app.icon className="w-6 h-6 text-gray-700" />
                                </div>
                                {app.status === 'Connected' ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Ordered</Badge>
                                ) : (
                                    <Button variant="ghost" size="sm" className="h-8">Connect</Button>
                                )}
                            </CardHeader>
                            <CardContent className="pt-4">
                                <CardTitle className="text-lg mb-1">{app.name}</CardTitle>
                                <CardDescription className="line-clamp-2 h-10 mb-4">
                                    {app.description}
                                </CardDescription>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Badge variant="outline" className="font-normal">{app.category}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
