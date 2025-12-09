'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Trophy } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function TeamLeaderboard({ members }: { members: any[] }) {
    // Mock calculating score - in real app would be aggregates from 'activity_log'
    // For MVP demonstration, we assign random activity scores to connected members
    const sortedMembers = [...members].map(m => ({
        ...m,
        score: Math.floor(Math.random() * 50) * 10
    })).sort((a, b) => b.score - a.score).slice(0, 5)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {sortedMembers.map((member, index) => (
                    <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                    index === 1 ? 'bg-gray-100 text-gray-700' :
                                        index === 2 ? 'bg-orange-100 text-orange-700' : 'text-gray-500'
                                }`}>
                                {index + 1}
                            </span>
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={member.users?.avatar_url} />
                                <AvatarFallback>{member.users?.display_name?.[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{member.users?.display_name}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{member.score} pts</span>
                    </div>
                ))}
                {members.length === 0 && <p className="text-sm text-gray-400">No active members.</p>}
            </CardContent>
        </Card>
    )
}
