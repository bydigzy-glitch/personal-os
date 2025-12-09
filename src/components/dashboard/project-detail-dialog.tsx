"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, CheckCircle2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function ProjectDetailDialog({ project, open, onOpenChange }: any) {
    if (!project) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                            {project.status || 'Active'}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>
                    <DialogTitle className="text-2xl mt-2">{project.name}</DialogTitle>
                    <DialogDescription>{project.description || 'No description provided.'}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50 flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Deadline</span>
                            <div className="flex items-center gap-2 font-semibold">
                                <Calendar className="w-4 h-4 text-primary" />
                                {project.due_date ? new Date(project.due_date).toLocaleDateString() : 'No date'}
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50 flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Team</span>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-primary" />
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <Avatar key={i} className="w-6 h-6 border-2 border-background">
                                            <AvatarFallback className="text-[10px] bg-primary/20">U{i}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">Progress</span>
                            <span className="text-muted-foreground">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                    </div>

                    {/* Tasks Preview */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium">Recent Tasks</h4>
                        {[1, 2].map(i => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-md border border-border bg-card">
                                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">Prepare design assets</span>
                                <Avatar className="w-6 h-6 ml-auto">
                                    <AvatarFallback className="text-[10px]">ME</AvatarFallback>
                                </Avatar>
                            </div>
                        ))}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button className="bg-primary text-primary-foreground">Edit Project</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
