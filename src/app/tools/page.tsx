'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Palette, Type as TypeIcon, Maximize, Scissors, Zap, Sparkles, SlidersHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const toolsets = [
    {
        name: 'Visuals',
        tools: [
            { id: 1, name: 'Contrast Pro', description: 'WCAG 3.0 accessibility checker with auto-fix.', icon: Palette, color: 'blue' },
            { id: 2, name: 'Frame Master', description: 'Quick aspect ratio and export preview tool.', icon: Maximize, color: 'purple' },
            { id: 3, name: 'SVG Slim', description: 'Lightning fast SVG path weight optimization.', icon: Scissors, color: 'emerald' },
        ]
    },
    {
        name: 'AI & Speed',
        tools: [
            { id: 4, name: 'Moodboard AI', description: 'Generate curated moodboards from prompts.', icon: Sparkles, color: 'amber' },
            { id: 5, name: 'Type Scale', description: 'Harmonious typography system generator.', icon: TypeIcon, color: 'blue' },
            { id: 6, name: 'Mockup Gen', description: 'Place designs in realistic 3D environments.', icon: Zap, color: 'red' },
        ]
    }
]

export default function ToolsPage() {
    return (
        <DashboardLayout>
            <div className="p-8 max-w-[1600px] mx-auto space-y-12 animate-enter">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Utility Suite</h1>
                        <p className="text-muted-foreground mt-1">Production-ready design tools built for speed.</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Configure
                    </Button>
                </div>

                {toolsets.map((set) => (
                    <div key={set.name} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{set.name}</h2>
                            <div className="h-px bg-border flex-1" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {set.tools.map((tool) => (
                                <Card key={tool.id} className="group relative overflow-hidden bg-card/50 hover:bg-card hover:-translate-y-1 transition-all duration-300 border-border">
                                    <div className={`absolute top-0 left-0 w-1 h-full opacity-50 bg-${tool.color}-500`} />
                                    <CardHeader className="pb-4">
                                        <div className={`w-12 h-12 rounded-2xl bg-${tool.color}-500/10 flex items-center justify-center mb-4 text-${tool.color}-600 ring-1 ring-${tool.color}-500/20 shadow-sm transition-transform group-hover:scale-110 duration-500`}>
                                            <tool.icon className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                                        <CardDescription className="text-muted-foreground leading-relaxed">
                                            {tool.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="ghost" className="w-full justify-between h-10 px-0 group/btn">
                                            <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">Launch Utility</span>
                                            <Zap className="w-4 h-4 text-muted-foreground group-hover:text-amber-500 group-hover:fill-amber-500 transition-all" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}
