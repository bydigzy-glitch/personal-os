'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Plus, ArrowUpRight, FolderOpen, MoreHorizontal, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ProjectsPage() {
    const projects = [
        { id: 1, title: 'Voda Branding', client: 'Voda Global', progress: 65, color: 'emerald' },
        { id: 2, title: 'Fintech Mobile App', client: 'Starlight', progress: 25, color: 'blue' },
        { id: 3, title: 'Web Dashboard', client: 'Acme Inc', progress: 90, color: 'purple' },
        { id: 4, title: 'Illustration Pack', client: 'Designly', progress: 40, color: 'amber' },
    ]

    return (
        <DashboardLayout>
            <div className="p-12 max-w-7xl mx-auto space-y-12 animate-enter">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter">Projects</h1>
                        <p className="text-muted-foreground text-lg mt-1 italic">Building tomorrow, pixel by pixel.</p>
                    </div>
                    <Button size="lg" className="rounded-2xl font-bold px-8 shadow-xl shadow-foreground/5">
                        <Plus className="w-5 h-5 mr-2" />
                        Create
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="group relative bg-card border border-border rounded-[32px] p-8 hover:border-foreground/20 transition-all duration-500 overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-12">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                                    `bg-${project.color}-500/10 text-${project.color}-600`
                                )}>
                                    <FolderOpen className="w-6 h-6" />
                                </div>
                                <button className="p-2 hover:bg-muted rounded-xl transition-all">
                                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-2xl font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-500">{project.title}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                                        <User className="w-3 h-3" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest">{project.client}</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-3 pt-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Progress</span>
                                        <span className="text-sm font-bold">{project.progress}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className={cn("h-full transition-all duration-1000 ease-out bg-foreground")} 
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-foreground font-bold text-xs flex items-center gap-1">
                                Open Project <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    <button className="group border-2 border-dashed border-border rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 hover:border-foreground/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                            <Plus className="w-6 h-6" />
                        </div>
                        <p className="font-bold text-muted-foreground group-hover:text-foreground transition-colors text-sm">Start New Project</p>
                    </button>
                </div>
            </div>
        </DashboardLayout>
    )
}
