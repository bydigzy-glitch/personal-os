"use client"

import { Card, CardContent } from '@/components/ui/card'
import { FileText, MoreVertical, Download, Eye, Trash2 } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { FileDetailDialog } from './file-detail-dialog'

interface FileCardProps {
    file: {
        id: string
        name: string
        size: number
        type: string
        created_at: string
    }
}

export function FileCard({ file }: FileCardProps) {
    const [open, setOpen] = useState(false)

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    // Determine icon color/bg based on type
    const isImage = file.type.startsWith('image')
    const isPdf = file.type.includes('pdf')

    return (
        <>
            <Card
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer bg-card border-border"
                onClick={() => setOpen(true)}
            >
                <CardContent className="p-4 flex items-center gap-4">
                    <div className={`
                    h-12 w-12 rounded-lg flex items-center justify-center shrink-0 transition-colors
                    ${isImage ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400' :
                            isPdf ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' :
                                'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'}
                `}>
                        <FileText className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate text-foreground group-hover:text-primary transition-colors">
                            {file.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                            <span>{formatSize(file.size)}</span>
                            <span>•</span>
                            <span>{new Date(file.created_at).toLocaleDateString()}</span>
                        </p>
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setOpen(true)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>

            <FileDetailDialog file={file} open={open} onOpenChange={setOpen} />
        </>
    )
}
