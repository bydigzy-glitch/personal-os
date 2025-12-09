"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, ExternalLink, Trash2, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { AppDetailDialog } from './app-detail-dialog'

interface AppCardProps {
    app: {
        id: string
        name: string
        description?: string | null
        icon_url?: string | null
        category?: string
        created_at?: string
    }
}

export function AppCard({ app }: AppCardProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Card
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-card border-border"
                onClick={() => setOpen(true)}
            >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            {app.icon_url ? (
                                <img src={app.icon_url} alt={app.name} className="h-full w-full object-cover rounded-lg" />
                            ) : (
                                app.name.charAt(0)
                            )}
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold">{app.name}</CardTitle>
                            <CardDescription className="text-xs line-clamp-1">{app.category || 'Tool'}</CardDescription>
                        </div>
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setOpen(true)}>Open</DropdownMenuItem>
                                <DropdownMenuItem>Favorite</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                        {app.description || 'No description available.'}
                    </p>
                </CardContent>
            </Card>

            <AppDetailDialog app={app} open={open} onOpenChange={setOpen} />
        </>
    )
}
