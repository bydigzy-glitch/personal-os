'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Trophy } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function TeamLeaderboard({ members, teamId }: { members: any[], teamId?: string }) {
    const [scores, setScores] = useState<Record<string, number>>({})
    const supabase = createClient()

    useEffect(() => {
        async function fetchScores() {
            // Determine team ID (either passed prop or from members)
            const tid = teamId || members[0]?.team_id
            if (!tid) return

            try {
                const { data, error } = await supabase.rpc('get_team_leaderboard', { p_team_id: tid })
                if (data) {
                    const scoreMap: Record<string, number> = {}
                    data.forEach(row => {
                        scoreMap[row.user_id] = row.score
                    })
                    setScores(scoreMap)
                }
                if (error) console.error(error)
            } catch (e) {
                console.error('Failed to fetch leaderboard', e)
            }
        }

        fetchScores()
    }, [members, teamId, supabase])

    const sortedMembers = [...members].map(m => ({
        ...m,
        score: scores[m.user_id] || 0
    })).sort((a, b) => b.score - a.score).slice(0, 5)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Activity Leaderboard
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
