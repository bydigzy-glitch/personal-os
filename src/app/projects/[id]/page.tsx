import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { FileCard } from '@/components/dashboard/file-card'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { UpdateProjectForm } from '@/components/projects/update-project-form'
import { DeleteProjectButton } from '@/components/projects/delete-project-button'

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/sign-in')
    }

    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

    if (!project) {
        notFound()
    }

    const { data: files } = await supabase
        .from('files')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: false })

    const statusColors = {
        active: 'bg-green-100 text-green-800',
        paused: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-blue-100 text-blue-800',
    }

    return (
        <DashboardLayout user={profile}>
            <div className="p-8 space-y-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/projects">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                        <p className="text-gray-600 mt-2">{project.description}</p>
                    </div>
                    <div className="flex gap-2">
                        <UpdateProjectForm project={project} />
                        <DeleteProjectButton projectId={project.id} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge className={statusColors[project.status]}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-2xl font-bold">{project.progress}%</div>
                            <Progress value={project.progress} className="h-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Created
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-medium">
                                {new Date(project.created_at).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Files</h2>
                    {files && files.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {files.map((file) => (
                                <FileCard key={file.id} file={file} />
                            ))}
                        </div>
                    ) : (
                        <Card className="border-2 border-dashed">
                            <CardContent className="py-12 text-center text-gray-500">
                                No files associated with this project yet
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
