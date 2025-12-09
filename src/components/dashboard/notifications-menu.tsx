"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NotificationsMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                        <DropdownMenuItem key={i} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                            <div className="flex items-center gap-2 w-full">
                                <span className="font-semibold text-sm">New Task Assigned</span>
                                <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                                Sarah assigned you to &quot;Update Brand Guidelines&quot;
                            </p>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                        <div className="flex items-center gap-2 w-full">
                            <span className="font-semibold text-sm">System Update</span>
                            <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            Creative Suite has been updated to v2.0!
                        </p>
                    </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full text-center text-sm font-medium justify-center p-2 cursor-pointer">
                    Mark all as read
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
