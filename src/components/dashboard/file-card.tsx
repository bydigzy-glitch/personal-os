'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Image, Video, Music, File } from 'lucide-react'
import type { Database } from '@/lib/supabase/database.types'

type FileRow = Database['public']['Tables']['files']['Row']

interface FileCardProps {
    file: FileRow
}

const fileIcons = {
    image: Image,
    video: Video,
    audio: Music,
    document: FileText,
    default: File,
}

const fileColors = {
    image: 'text-purple-600 bg-purple-50',
    video: 'text-blue-600 bg-blue-50',
    audio: 'text-green-600 bg-green-50',
    document: 'text-orange-600 bg-orange-50',
    default: 'text-gray-600 bg-gray-50',
}

export function FileCard({ file }: FileCardProps) {
    const fileType = file.type.split('/')[0] as keyof typeof fileIcons
    const Icon = fileIcons[fileType] || fileIcons.default
    const colorClass = fileColors[fileType] || fileColors.default

    const timeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        }

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit)
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`
            }
        }
        return 'Just now'
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                        <p className="text-sm text-gray-500">{timeAgo(file.created_at)}</p>
                    </div>
                    <Button variant="outline" size="sm">
                        Open
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
