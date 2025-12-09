'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { MemberDetailDialog } from '@/components/team/member-detail-dialog'

export function MemberList({ members }: { members: any[] }) {
    const [selectedMember, setSelectedMember] = useState<any>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleMemberClick = (member: any) => {
        setSelectedMember(member)
        setDialogOpen(true)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Team Members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors"
                            onClick={() => handleMemberClick(member)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Avatar>
                                        <AvatarImage src={member.users?.avatar_url || ''} />
                                        <AvatarFallback>{(member.users?.display_name || 'U')[0]?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    {/* Presence Dot Placeholder - To be wired with Realtime */}
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 border-2 border-white rounded-full"></span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{member.users?.display_name || 'Unknown'}</p>
                                    <p className="text-xs text-gray-500 capitalize">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <MemberDetailDialog
                member={selectedMember}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </>
    )
}
