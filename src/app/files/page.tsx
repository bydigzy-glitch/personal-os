'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Image as ImageIcon, FileSpreadsheet, MoreVertical, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const dummyFiles = [
    { id: '1', name: 'Proposal_v2.pdf', type: 'PDF', size: '2.4 MB', date: '2h ago', icon: FileText },
    { id: '2', name: 'Homepage_Hero.png', type: 'Image', size: '4.1 MB', date: '5h ago', icon: ImageIcon },
    { id: '3', name: 'Q4_Financials.xlsx', type: 'Spreadsheet', size: '1.2 MB', date: '1d ago', icon: FileSpreadsheet },
    { id: '4', name: 'Contract_Acme.pdf', type: 'PDF', size: '1.8 MB', date: '2d ago', icon: FileText },
]

export default function FilesPage() {
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Files</h2>
                        <p className="text-gray-500 mt-2">Access and manage all your documents.</p>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Upload File
                    </Button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-6">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>
                    {dummyFiles.map((file) => (
                        <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                            <div className="col-span-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                    <file.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{file.name}</p>
                                    <p className="text-xs text-gray-500">{file.date}</p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <Badge variant="secondary">{file.type}</Badge>
                            </div>
                            <div className="col-span-2 text-sm text-gray-600">{file.size}</div>
                            <div className="col-span-2 flex justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
