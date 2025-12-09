'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { Database } from '@/lib/supabase/database.types'

type App = Database['public']['Tables']['apps']['Row']

interface AppCardProps {
    app: App
}

const categoryColors: Record<string, string> = {
    design: 'bg-purple-100 text-purple-800',
    development: 'bg-blue-100 text-blue-800',
    productivity: 'bg-green-100 text-green-800',
    marketing: 'bg-orange-100 text-orange-800',
    default: 'bg-gray-100 text-gray-800',
}

export function AppCard({ app }: AppCardProps) {
    const colorClass = categoryColors[app.category.toLowerCase()] || categoryColors.default

    return (
        <Link href={`/apps/${app.id}`}>
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {/* App Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {app.icon || app.name[0].toUpperCase()}
                        </div>

                        {/* App Info */}
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg text-gray-900">{app.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {app.description || 'No description available'}
                            </p>
                        </div>

                        {/* Category Badge */}
                        <Badge className={colorClass}>
                            {app.category}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
