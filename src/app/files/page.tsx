'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Plus, Upload, FolderPlus, Radio, Search, Image as ImageIcon, Folder } from 'lucide-react'
import { useState } from 'react'

// Dummy data matching the screenshot
const files = [
    {
        id: 1,
        title: 'Q4 Sales Deck',
        subtitle: 'Shared folder • 8 presentations',
        type: 'folder'
    },
    {
        id: 2,
        title: 'Product Videos',
        subtitle: 'Shared folder • 5 videos',
        type: 'folder'
    },
    {
        id: 3,
        title: 'ROI Calculator',
        subtitle: 'Shared file • 1 Excel',
        type: 'file'
    }
]

export default function FilesPage() {
    const [activeTab, setActiveTab] = useState('Recent')

    return (
        <DashboardLayout>
            <div className="p-8 max-w-[1600px] mx-auto space-y-8">
                {/* Action Bar */}
                <div className="flex items-center gap-3">
                    <Button className="bg-black text-white hover:bg-gray-800 rounded-lg px-6">
                        <Plus className="w-4 h-4 mr-2" />
                        Create
                    </Button>
                    <Button variant="outline" className="rounded-lg px-4 border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                    </Button>
                    <Button variant="outline" className="rounded-lg px-4 border-gray-200 text-gray-700 hover:bg-gray-50">
                        <FolderPlus className="w-4 h-4 mr-2" />
                        Create folder
                    </Button>
                    <Button variant="outline" className="rounded-lg px-4 border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Radio className="w-4 h-4 mr-2" />
                        Record
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100/80 p-1 rounded-lg w-fit">
                    {['Recent', 'Starred', 'Shared'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                        px-4 py-1.5 text-sm font-medium rounded-md transition-all
                        ${activeTab === tab
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                }
                    `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="group border border-gray-200 bg-white rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer"
                        >
                            {/* Thumbnail Area */}
                            <div className="aspect-[16/10] bg-gray-100 flex items-center justify-center relative group-hover:bg-gray-50 transition-colors">
                                <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-gray-400">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-1">{file.title}</h3>
                                <p className="text-sm text-gray-500">{file.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
