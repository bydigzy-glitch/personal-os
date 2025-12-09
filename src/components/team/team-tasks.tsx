'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'

export function TeamTasks({ teamId }: { teamId: string }) {
    const [tasks, setTasks] = useState<any[]>([])
    const supabase = createClient()

    useEffect(() => {
        async function fetchTasks() {
            const { data, error } = await supabase
                .from('tasks')
                .select('*, assigned_to:users!assigned_to_user_id(display_name, avatar_url)')
                .eq('team_id', teamId)
                .order('due_date', { ascending: true })

            if (error) {
                console.error('Error fetching tasks:', error)
            }
            if (data) setTasks(data)
        }
        if (teamId) fetchTasks()
    }, [teamId, supabase])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Team Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-8">No tasks assigned to the team yet.</p>
                    ) : (
                        tasks.map(task => (
                            <div key={task.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div>
                                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <Badge variant={task.status === 'done' ? 'secondary' : 'outline'} className="capitalize">
                                            {task.status.replace('_', ' ')}
                                        </Badge>
                                        {task.due_date && (
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(task.due_date).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {task.assigned_to && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                        <span className="bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                                            {task.assigned_to.display_name?.[0].toUpperCase()}
                                        </span>
                                        <span className="font-medium text-xs">{task.assigned_to.display_name}</span>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
