"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MoreHorizontal, ArrowRight, FolderKanban } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { ProjectDetailDialog } from './project-detail-dialog'

interface ProjectCardProps {
    project: {
        id: string
        name: string
        description?: string | null
        status?: string | null
        due_date?: string | null
        progress?: number
    }
}

export function ProjectCard({ project }: ProjectCardProps) {
    const [open, setOpen] = useState(false)

    const progress = project.progress || Math.floor(Math.random() * 100)

    return (
        <>
            <Card
                className="group relative flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-card border-border"
                onClick={() => setOpen(true)}
            >
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <FolderKanban className="w-5 h-5" />
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => setOpen(true)}>Open Project</DropdownMenuItem>
                                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                    <DropdownMenuItem>View Team</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <CardTitle className="mt-4 text-lg font-bold">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1 min-h-[40px]">
                        {project.description || 'No description'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-4 flex-1">
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                </CardContent>
                <CardFooter className="pt-0 border-t border-border/50 p-4 bg-muted/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {project.due_date ? new Date(project.due_date).toLocaleDateString() : 'No deadline'}
                    </div>
                    <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'} className="text-[10px] px-2 h-5">
                        {project.status || 'Active'}
                    </Badge>
                </CardFooter>
            </Card>

            <ProjectDetailDialog project={project} open={open} onOpenChange={setOpen} />
        </>
    )
}
