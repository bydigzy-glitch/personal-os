'use client'

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, ThumbsUp, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const discussions = [
    {
        author: "Sarah Chen",
        avatar: "",
        title: "Best practices for file organization?",
        preview: "I'm trying to figure out the best way to structure my project files. Do you guys separate by client or by file type?",
        replies: 12,
        likes: 45,
        time: "2h ago"
    },
    {
        author: "Mike Ross",
        avatar: "",
        title: "New feature request: Dark mode",
        preview: "It would be great to have a native dark mode for late night work sessions. Anyone else agree?",
        replies: 28,
        likes: 120,
        time: "5h ago"
    },
    {
        author: "Alex Morgan",
        avatar: "",
        title: "Integration with Slack",
        preview: "Has anyone successfully used the API to send notifications to Slack? I'm hitting a CORS error.",
        replies: 5,
        likes: 12,
        time: "1d ago"
    }
]

export default function CommunityPage() {
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Community</h2>
                        <p className="text-gray-500 mt-2">Connect with other creators and share your workflow.</p>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        Start Discussion
                    </Button>
                </div>

                <div className="space-y-4">
                    {discussions.map((discussion, index) => (
                        <Card key={index} className="hover:border-blue-200 transition-colors cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src={discussion.avatar} />
                                        <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-lg text-gray-900">{discussion.title}</h3>
                                            <span className="text-sm text-gray-500">{discussion.time}</span>
                                        </div>
                                        <p className="text-gray-600">{discussion.preview}</p>
                                        <div className="flex items-center gap-6 pt-2">
                                            <div className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="text-sm">{discussion.replies} Replies</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span className="text-sm">{discussion.likes} Likes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
