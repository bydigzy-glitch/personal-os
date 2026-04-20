'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Download, CreditCard, ArrowUpRight, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BillingPage() {
    const invoices = [
        { id: 'INV-2026-001', client: 'Acme Corp', amount: '$4,500.00', status: 'Paid', date: 'Apr 12, 2026', variant: 'emerald' },
        { id: 'INV-2026-002', client: 'TechStart', amount: '$1,200.00', status: 'Pending', date: 'Apr 18, 2026', variant: 'amber' },
        { id: 'INV-2026-003', client: 'Global Retail', amount: '$3,800.00', status: 'Overdue', date: 'Mar 30, 2026', variant: 'red' },
    ]

    return (
        <DashboardLayout>
            <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-enter">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
                        <p className="text-muted-foreground mt-1">Manage your income, invoices, and expenses.</p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Create Invoice
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-card/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                            <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-600">
                                <DollarSign className="w-4 h-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$12,450.00</div>
                            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                                <TrendingUp className="w-3 h-3" />
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Invoices</CardTitle>
                            <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600">
                                <CreditCard className="w-4 h-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$3,200.00</div>
                            <p className="text-xs text-muted-foreground mt-1 text-amber-600/80">
                                4 invoices awaiting payment
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Contracts</CardTitle>
                            <div className="bg-blue-500/10 p-2 rounded-lg text-blue-600">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">6</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Retainer and project based
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-border bg-muted/30">
                        <h2 className="font-semibold">Recent Invoices</h2>
                    </div>
                    <div className="divide-y divide-border">
                        {invoices.map((inv) => (
                            <div key={inv.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center font-mono text-xs font-bold text-muted-foreground">
                                        INV
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground tracking-tight">{inv.id}</p>
                                        <p className="text-sm text-muted-foreground">{inv.client}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-12">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-medium">{inv.date}</p>
                                        <p className="text-xs text-muted-foreground">Due Date</p>
                                    </div>
                                    <div className="text-right w-24">
                                        <p className="font-bold font-mono">{inv.amount}</p>
                                        <Badge 
                                            variant={inv.variant as any} 
                                            className="mt-1 h-5 text-[10px] uppercase tracking-wider"
                                        >
                                            {inv.status}
                                        </Badge>
                                    </div>
                                    <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
