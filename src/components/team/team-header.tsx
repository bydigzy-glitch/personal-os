'use client'

import { Button } from '@/components/ui/button'
import { Plus, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { InviteMemberDialog } from './invite-member-dialog'

export function TeamHeader({ team, members, role }: { team: any, members: any[], role: string | null }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
                    <p className="text-gray-500 mt-1">{team.description || 'No description'}</p>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{members.length} members</span>
                        </div>
                        {/* Placeholder for real-time presence count */}
                        {/* <Badge variant="secondary" className="bg-green-100 text-green-700">
                            X Online
                        </Badge> */}
                    </div>
                </div>
                <div className="flex gap-2">
                    {(role === 'owner' || role === 'admin') && (
                        <InviteMemberDialog teamId={team.id} />
                    )}
                </div>
            </div>
        </div>
    )
}
