'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function CalendarPage() {
    const [view, setView] = useState<'month' | 'week'>('month')
    
    // Minimal mock data for deadlines and meetings
    const events = [
        { title: 'Project X Deadline', date: '2026-04-22', color: 'red' },
        { title: 'Client Sync: Branding', date: '2026-04-20', time: '14:00', color: 'blue' },
        { title: 'Moodboard Review', date: '2026-04-25', color: 'purple' },
    ]

    return (
        <DashboardLayout>
            <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-enter">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
                        <p className="text-muted-foreground mt-1">Schedule your creative sprints and deadlines.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-muted p-1 rounded-lg">
                            <Button 
                                variant={view === 'month' ? 'secondary' : 'ghost'} 
                                size="sm" 
                                onClick={() => setView('month')}
                                className="h-8 shadow-none"
                            >
                                Month
                            </Button>
                            <Button 
                                variant={view === 'week' ? 'secondary' : 'ghost'} 
                                size="sm" 
                                onClick={() => setView('week')}
                                className="h-8 shadow-none"
                            >
                                Week
                            </Button>
                        </div>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Block Time
                        </Button>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-semibold">April 2026</h2>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-7 border-b border-border">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="p-4 text-xs font-semibold text-muted-foreground text-center border-r border-border last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 grid-rows-5 h-[700px]">
                        {Array.from({ length: 35 }).map((_, i) => {
                            const day = i - 2; // Offset for April 2026 start
                            const isCurrentMonth = day > 0 && day <= 30;
                            const isToday = day === 20;

                            return (
                                <div key={i} className={cn(
                                    "p-2 border-r border-b border-border last:border-r-0 relative group hover:bg-muted/30 transition-colors",
                                    !isCurrentMonth && "bg-muted/10 opacity-50"
                                )}>
                                    <div className="flex items-center justify-between">
                                        <span className={cn(
                                            "text-sm font-medium inline-flex items-center justify-center w-7 h-7 rounded-full",
                                            isToday && "bg-primary text-primary-foreground"
                                        )}>
                                            {isCurrentMonth ? day : ''}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-2 space-y-1">
                                        {events.filter(e => e.date === `2026-04-${String(day).padStart(2, '0')}`).map((event, idx) => (
                                            <div key={idx} className={cn(
                                                "text-[10px] px-2 py-1 rounded border leading-tight font-medium",
                                                event.color === 'red' && "bg-red-500/10 text-red-600 border-red-500/20",
                                                event.color === 'blue' && "bg-blue-500/10 text-blue-600 border-blue-500/20",
                                                event.color === 'purple' && "bg-purple-500/10 text-purple-600 border-purple-500/20"
                                            )}>
                                                {event.time && `${event.time} `}{event.title}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {isCurrentMonth && (
                                        <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary rounded-full p-1 text-primary-foreground shadow-sm active:scale-90">
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
