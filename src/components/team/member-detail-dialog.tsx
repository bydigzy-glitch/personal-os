'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheckCircle } from 'lucide-react'

// Pass the member object and open state
export function MemberDetailDialog({ member, open, onOpenChange }: any) {
    if (!member) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={member.users?.avatar_url || ''} />
                            <AvatarFallback className="text-xl">{member.users?.display_name?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle className="text-xl">{member.users?.display_name}</DialogTitle>
                            <p className="text-sm text-gray-500 capitalize">{member.role} • Joined {new Date(member.joined_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Activity Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg text-center border border-gray-100">
                            <span className="block text-2xl font-bold text-gray-900">12</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Tasks Completed</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg text-center border border-gray-100">
                            <span className="block text-2xl font-bold text-gray-900">5</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Events Attended</span>
                        </div>
                    </div>

                    {/* Recent Tasks */}
                    <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-gray-400" />
                            Recent Activity
                        </h4>
                        <div className="space-y-2">
                            <div className="p-3 border rounded-md text-sm text-gray-500 bg-gray-50 flex items-center justify-center h-20">
                                No recent activity to display.
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
