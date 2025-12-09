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
import { FileText, Download, Trash2, Edit2, Play } from "lucide-react"

export function FileDetailDialog({ file, open, onOpenChange }: any) {
    if (!file) return null

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 truncate pr-4">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="truncate">{file.name}</span>
                    </DialogTitle>
                    <DialogDescription>
                        File Details
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="rounded-lg border bg-muted/40 p-8 flex items-center justify-center">
                        <div className="text-center space-y-2">
                            <FileText className="w-16 h-16 mx-auto text-muted-foreground/50" />
                            <p className="text-sm text-muted-foreground">Preview not available</p>
                        </div>
                    </div>

                    <dl className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <dt className="text-muted-foreground">Type</dt>
                            <dd className="font-medium truncate">{file.type || 'Unknown'}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Size</dt>
                            <dd className="font-medium">{formatSize(file.size || 0)}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Created</dt>
                            <dd className="font-medium">{new Date(file.created_at).toLocaleDateString()}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Modified</dt>
                            <dd className="font-medium">{new Date(file.updated_at || file.created_at).toLocaleDateString()}</dd>
                        </div>
                    </dl>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="destructive" className="sm:mr-auto gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Edit2 className="w-4 h-4" />
                        Rename
                    </Button>
                    <Button className="gap-2 bg-primary text-primary-foreground">
                        <Download className="w-4 h-4" />
                        Download
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
