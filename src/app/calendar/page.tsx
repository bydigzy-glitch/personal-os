'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function CalendarPage() {
    const days = Array.from({ length: 30 }) // Simplified
    const events = [
        { day: 20, title: 'Sync', color: 'blue' },
        { day: 22, title: 'Deadline', color: 'red' },
        { day: 25, title: 'Export', color: 'purple' },
    ]

    return (
        <DashboardLayout>
            <div className="p-12 max-w-6xl mx-auto space-y-12 animate-enter">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter">Calendar</h1>
                        <p className="text-muted-foreground text-lg mt-1 italic">April 2026 — Productive Flow.</p>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-[32px] overflow-hidden shadow-2xl shadow-foreground/5">
                    <div className="p-8 flex items-center justify-between border-b border-border bg-muted/20">
                        <div className="flex items-center gap-6">
                            <h2 className="text-2xl font-bold tracking-tight">April</h2>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-background"><ChevronLeft className="w-5 h-5" /></Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-background"><ChevronRight className="w-5 h-5" /></Button>
                            </div>
                        </div>
                        <Button variant="outline" className="rounded-xl font-bold gap-2">
                            <Plus className="w-4 h-4" />
                            Booking
                        </Button>
                    </div>

                    <div className="grid grid-cols-7 border-b border-border">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="p-4 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 border-r last:border-r-0 border-border">
                                {d}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 h-[600px]">
                        {days.map((_, i) => {
                            const dayNum = i + 1
                            const hasEvents = events.filter(e => e.day === dayNum)
                            const isToday = dayNum === 20

                            return (
                                <div key={i} className="group relative p-4 border-r last:border-r-0 border-b border-border hover:bg-muted/30 transition-colors">
                                    <span className={cn(
                                        "text-sm font-bold w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-300",
                                        isToday ? "bg-foreground text-background scale-110 shadow-xl" : "text-foreground/80 group-hover:text-foreground"
                                    )}>
                                        {dayNum}
                                    </span>
                                    
                                    <div className="mt-4 space-y-1.5 px-1">
                                        {hasEvents.map((e, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className={cn("w-1.5 h-1.5 rounded-full", 
                                                    e.color === 'blue' ? 'bg-blue-500' : 
                                                    e.color === 'red' ? 'bg-red-500' : 'bg-purple-500'
                                                )} />
                                                <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground truncate">{e.title}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-foreground text-background rounded-full scale-75 group-hover:scale-100 duration-500">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            )
                        })}
                        {/* Padding for empty cells */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`empty-${i}`} className="bg-muted/10 opacity-30 border-r border-b border-border" />
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
