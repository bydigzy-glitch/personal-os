'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, MessageCircle, MoreHorizontal, UserPlus, Phone } from 'lucide-react'

export default function ClientsPage() {
    const clients = [
        { id: 1, name: 'Voda Global', contact: 'Alex Rivera', email: 'alex@voda.com', lastActive: '2 hrs ago', active: true },
        { id: 2, name: 'Acme Design', contact: 'Sarah Jones', email: 'sarah@acme.inc', lastActive: 'Yesterday', active: false },
        { id: 3, name: 'Starlight Inc', contact: 'Mark Chen', email: 'mark@star.io', lastActive: '3 days ago', active: true },
        { id: 4, name: 'Creative Labs', contact: 'Elena Rossi', email: 'elena@labs.it', lastActive: '1 week ago', active: false },
    ]

    return (
        <DashboardLayout>
            <div className="p-12 max-w-6xl mx-auto space-y-16 animate-enter">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter">Clients</h1>
                        <p className="text-muted-foreground text-lg mt-1 italic">Partners in creation.</p>
                    </div>
                    <Button size="lg" className="rounded-2xl font-bold gap-2 shadow-xl shadow-foreground/5">
                        <UserPlus className="w-5 h-5" />
                        Add Client
                    </Button>
                </div>

                <div className="space-y-6">
                    {clients.map((client) => (
                        <div 
                            key={client.id} 
                            className="group bg-card border border-border rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-300 hover:border-foreground/20 hover:translate-x-1"
                        >
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <Avatar className="w-16 h-16 rounded-2xl border-4 border-background transition-transform group-hover:rotate-6 duration-500">
                                        <AvatarFallback className="bg-muted text-foreground font-bold text-xl">
                                            {client.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {client.active && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-background animate-pulse" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold tracking-tight">{client.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground/70">{client.contact}</span>
                                        <div className="w-1 h-1 bg-border rounded-full" />
                                        <span className="font-medium">{client.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-6 sm:mt-0">
                                <div className="text-right mr-4 hidden md:block">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Last Active</p>
                                    <p className="text-xs font-bold text-foreground/80">{client.lastActive}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-12 h-12 flex items-center justify-center bg-muted rounded-2xl hover:bg-foreground hover:text-background transition-all duration-500">
                                        <Mail className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 flex items-center justify-center bg-muted rounded-2xl hover:bg-foreground hover:text-background transition-all duration-500">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 flex items-center justify-center bg-muted rounded-2xl hover:bg-muted/80 transition-all">
                                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
