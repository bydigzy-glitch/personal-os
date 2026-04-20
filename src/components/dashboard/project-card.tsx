"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MoreHorizontal, FolderKanban } from 'lucide-react'
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

// Deterministic pseudo-random from string — fixes SSR hydration mismatch
function deterministicProgress(id: string): number {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) >>> 0
    }
    return (hash % 81) + 10 // always 10–90
}

export function ProjectCard({ project }: ProjectCardProps) {
    const [open, setOpen] = useState(false)

    const progress = project.progress ?? deterministicProgress(project.id)

    const getStatusVariant = (status: string | null | undefined) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'emerald'
            case 'in progress': return 'blue'
            case 'active': return 'blue'
            case 'planning': return 'purple'
            case 'on hold': return 'amber'
            default: return 'secondary'
        }
    }

    return (
        <>
            <Card
                className="group relative flex flex-col cursor-pointer bg-card border-border transition-[transform,box-shadow] duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] active:transition-none"
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
                    <Badge variant={getStatusVariant(project.status) as any} className="text-[10px] px-2 h-5 tracking-wide">
                        {project.status || 'Active'}
                    </Badge>
                </CardFooter>
            </Card>

            <ProjectDetailDialog project={project} open={open} onOpenChange={setOpen} />
        </>
    )
}
