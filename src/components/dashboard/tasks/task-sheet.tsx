"use client"

import { useState } from "react"
import { Database } from "@/lib/supabase/database.types"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type Task = Database["public"]["Tables"]["tasks"]["Row"]

interface TaskSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    task: Task | null
}

export function TaskSheet({ open, onOpenChange, task }: TaskSheetProps) {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    if (!task) return null

    // Mock saving logic
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Update logic here...
        setTimeout(() => {
            setLoading(false)
            onOpenChange(false)
        }, 500)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] flex flex-col gap-6 overflow-y-auto">
                <SheetHeader>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        <Badge variant="outline">{task.status}</Badge>
                        <span>ID: {task.id.slice(0, 8)}</span>
                    </div>
                    <SheetTitle className="text-xl">{task.title}</SheetTitle>
                    <SheetDescription>
                        Created on {new Date(task.created_at).toLocaleDateString()}
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSave} className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" defaultValue={task.title} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select defaultValue={task.status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todo">Todo</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Priority</Label>
                            <Select defaultValue="medium">
                                <SelectTrigger>
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="desc">Description</Label>
                        <Textarea
                            id="desc"
                            className="min-h-[100px]"
                            defaultValue={task.description || ""}
                            placeholder="Add details..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Assignee</Label>
                        <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/20">
                            <Avatar className="h-6 w-6">
                                <AvatarFallback>?</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">Unassigned</span>
                            <Button variant="ghost" size="sm" className="ml-auto text-xs h-6">Change</Button>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Activity</h4>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Detailed activity log coming soon.</span>
                        </div>
                    </div>

                </form>

                <SheetFooter className="mt-auto">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
