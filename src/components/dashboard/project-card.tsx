'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Calendar, Users, FileText, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import type { Database } from '@/lib/supabase/database.types'

type Project = Database['public']['Tables']['projects']['Row']

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const statusColors = {
        active: 'bg-green-100 text-green-800',
        paused: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-blue-100 text-blue-800',
    }

    return (
        <Link href={`/projects/${project.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {project.description}
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Badge className={statusColors[project.status]}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(project.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
