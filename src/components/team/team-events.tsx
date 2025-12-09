'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function TeamEvents({ teamId }: { teamId: string }) {
    const [events, setEvents] = useState<any[]>([])
    const supabase = createClient()

    useEffect(() => {
        async function fetchEvents() {
            const { data } = await supabase
                .from('events')
                .select('*')
                .eq('team_id', teamId)
                .gte('start_time', new Date().toISOString()) // Only upcoming
                .order('start_time', { ascending: true })
                .limit(5)

            if (data) setEvents(data)
        }
        if (teamId) fetchEvents()
    }, [teamId, supabase])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {events.length === 0 ? (
                        <p className="text-sm text-gray-500 py-4">No upcoming events scheduled.</p>
                    ) : (
                        events.map(event => (
                            <div key={event.id} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                {/* Date Box */}
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 flex-shrink-0">
                                    <span className="text-xs font-semibold uppercase">{new Date(event.start_time).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-lg font-bold">{new Date(event.start_time).getDate()}</span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>
                                                {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        {event.type && (
                                            <Badge variant="outline" className="text-[10px] h-5">
                                                {event.type}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
