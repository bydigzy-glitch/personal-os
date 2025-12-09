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
import { ExternalLink, Heart, Star } from "lucide-react"

export function AppDetailDialog({ app, open, onOpenChange }: any) {
    if (!app) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                {app.icon_url ? <img src={app.icon_url} alt="" className="h-full w-full object-cover rounded-xl" /> : app.name[0]}
                            </div>
                            <div>
                                <DialogTitle className="text-xl">{app.name}</DialogTitle>
                                <DialogDescription className="text-base mt-1">{app.description}</DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="capitalize">{app.category}</Badge>
                        <Badge variant="outline">Installed</Badge>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        <p>Connected on {new Date(app.created_at || Date.now()).toLocaleDateString()}</p>
                        <p className="mt-2">Use this tool to manage your creative assets and workflows directly within Creative Suite.</p>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" className="gap-2 w-full sm:w-auto">
                        <Heart className="w-4 h-4" />
                        Favorite
                    </Button>
                    <Button className="gap-2 w-full sm:w-auto bg-primary text-primary-foreground">
                        <ExternalLink className="w-4 h-4" />
                        Launch App
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
