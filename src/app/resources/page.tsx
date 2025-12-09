'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileBox, Layers, Palette } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'

const resources = [
    {
        title: "Project Management Template",
        description: "A comprehensive Notion template for managing complex creative projects.",
        type: "Template",
        size: "2.4 MB",
        icon: Layers
    },
    {
        title: "UI Design Kit v2.0",
        description: "Over 200+ customizable components for Figma and Sketch.",
        type: "Asset",
        size: "145 MB",
        icon: Palette
    },
    {
        title: "Freelance Contract Pack",
        description: "Standard legal contracts for various freelance services.",
        type: "Document",
        size: "1.2 MB",
        icon: FileBox
    }
]

export default function ResourcesPage() {
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: profile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                setUser(profile)
            }
        }
        getUser()
    }, [supabase])

    return (
        <DashboardLayout user={user}>
            <div className="p-8 max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Resources</h2>
                        <p className="text-gray-500 mt-2">Free assets and templates to speed up your work.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
                                    <resource.icon className="w-6 h-6" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                                    <Badge variant="outline">{resource.type}</Badge>
                                </div>
                                <CardDescription className="mt-2 min-h-[40px]">
                                    {resource.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500">{resource.size}</span>
                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
