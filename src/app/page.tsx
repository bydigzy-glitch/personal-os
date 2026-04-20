'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Plus, Check, MoreVertical, Clock, Target } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Finalize Branding for Voda', category: 'Project', deadline: 'Today', done: false },
        { id: 2, title: 'Export Assets for Mobile App', category: 'Task', deadline: 'Tomorrow', done: true },
        { id: 3, title: 'Internal Strategy Sync', category: 'Meeting', deadline: 'Apr 22', done: false },
        { id: 4, title: 'Refactor Auth Hooks', category: 'Dev', deadline: 'Today', done: false },
    ])

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
    }

    return (
        <DashboardLayout>
            <div className="p-12 max-w-5xl mx-auto space-y-16 animate-enter">
                {/* Header Section */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter">Your Day</h1>
                    <p className="text-muted-foreground text-lg">Focus on the <span className="text-foreground font-semibold">3 items</span> that matter most today.</p>
                </div>

                {/* Big Task Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Active Tasks</h2>
                            <button className="text-xs font-bold text-foreground/50 hover:text-foreground transition-colors">Clear Done</button>
                        </div>
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div 
                                    key={task.id} 
                                    onClick={() => toggleTask(task.id)}
                                    className="group flex items-center gap-4 p-5 bg-card border border-border rounded-2xl cursor-pointer hover:border-foreground/20 transition-all duration-300"
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                                        task.done 
                                            ? "bg-foreground border-foreground text-background scale-90" 
                                            : "border-muted-foreground/30 group-hover:border-foreground/50"
                                    )}>
                                        {task.done && <Check className="w-3 h-3" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn(
                                            "font-semibold tracking-tight transition-all duration-500",
                                            task.done ? "text-muted-foreground line-through opacity-50" : "text-foreground"
                                        )}>
                                            {task.title}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">{task.category}</span>
                                            <div className="w-1 h-1 bg-border rounded-full" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-1">
                                                <Clock className="w-2 h-2" />
                                                {task.deadline}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-muted rounded-lg transition-all">
                                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-2 hover:border-foreground/30 hover:bg-transparent text-muted-foreground group">
                            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-500" />
                            Add something new
                        </Button>
                    </div>

                    <div className="space-y-12">
                         {/* Project pulse */}
                         <div className="space-y-6">
                            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Project Pulse</h2>
                            <div className="bg-foreground text-background p-8 rounded-3xl space-y-6">
                                <div className="flex items-center justify-between">
                                    <Target className="w-8 h-8 opacity-50" />
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Status</p>
                                        <p className="text-sm font-bold">On Track</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold tracking-tighter leading-tight">Voda Branding</h3>
                                    <div className="w-full h-1 bg-background/20 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-background" />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                                        <span>Progress</span>
                                        <span>65%</span>
                                    </div>
                                </div>
                                <Button className="w-full bg-background text-foreground hover:bg-background/90 rounded-xl font-bold h-12">
                                    Go to Project
                                </Button>
                            </div>
                         </div>

                         {/* Up next */}
                         <div className="space-y-6">
                            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Up Next</h2>
                            <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
                                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center font-bold text-xs">
                                    2PM
                                </div>
                                <div>
                                    <p className="font-bold">Client Sync</p>
                                    <p className="text-xs text-muted-foreground">Acme Design Studio</p>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
