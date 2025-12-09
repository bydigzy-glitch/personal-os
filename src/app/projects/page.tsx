'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FolderKanban, Clock, User as UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'

const dummyProjects = [
    {
        id: '1',
        title: 'Website Redesign',
        description: 'Redesigning the corporate website with a modern look and improved performance.',
        status: 'In Progress',
        dueDate: 'Dec 25, 2025',
        client: 'Acme Corp'
    },
    {
        id: '2',
        title: 'Mobile App Development',
        description: 'Building a cross-platform mobile app for the new product launch.',
        status: 'Planning',
        dueDate: 'Jan 15, 2026',
        client: 'TechStart'
    },
    {
        id: '3',
        title: 'Marketing Campaign',
        description: 'Q4 marketing campaign assets and social media strategy.',
        status: 'Completed',
        dueDate: 'Nov 30, 2025',
        client: 'Global Retail'
    }
]

export default function ProjectsPage() {
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h2>
                        <p className="text-gray-500 mt-2">Manage your ongoing projects and tasks.</p>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyProjects.map((project) => (
                        <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant={project.status === 'Completed' ? 'secondary' : 'default'} className={project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}>
                                        {project.status}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <FolderKanban className="w-5 h-5 text-gray-500" />
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="mt-2 line-clamp-2">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>Due: {project.dueDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-4 h-4" />
                                        <span>Client: {project.client}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
