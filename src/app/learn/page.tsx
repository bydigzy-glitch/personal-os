'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const courses = [
    {
        title: "Getting Started with Personal OS",
        description: "Learn the basics of managing your projects and files.",
        duration: "10 min",
        level: "Beginner",
        category: "Onboarding"
    },
    {
        title: "Advanced Workflow Automation",
        description: "Master your productivity with advanced tips and tricks.",
        duration: "25 min",
        level: "Advanced",
        category: "Productivity"
    },
    {
        title: "Collaboration 101",
        description: "How to work effectively with clients and team members.",
        duration: "15 min",
        level: "Intermediate",
        category: "Soft Skills"
    }
]

export default function LearnPage() {
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Learning Center</h2>
                        <p className="text-gray-500 mt-2">Master your workflow with these tutorials and guides.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="secondary">{course.category}</Badge>
                                    <Badge variant="outline">{course.level}</Badge>
                                </div>
                                <CardTitle className="text-xl">{course.title}</CardTitle>
                                <CardDescription className="mt-2 line-clamp-2">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm text-gray-500 gap-4">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-600 font-medium">
                                        <PlayCircle className="w-4 h-4" />
                                        <span>Start Learning</span>
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
