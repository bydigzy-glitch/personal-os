import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ProjectCard } from '@/components/dashboard/project-card'
import { FileCard } from '@/components/dashboard/file-card'
import { AppCard } from '@/components/dashboard/app-card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { DashboardTasks } from '@/components/dashboard/dashboard-tasks'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  let projects: any[] = []
  let files: any[] = []
  let tasks: any[] = []

  if (user) {
    const { data: fetchedProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = fetchedProfile

    const { data: fetchedProjects } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(3)
    projects = fetchedProjects || []

    const { data: fetchedFiles } = await supabase
      .from('files')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(4)
    files = fetchedFiles || []

    const { data: fetchedTasks } = await supabase
      .from('tasks')
      .select('*')
      .or(`assigned_to_user_id.eq.${user.id},created_by.eq.${user.id}`)
      .order('created_at', { ascending: false })
      .limit(10)
    tasks = fetchedTasks || []

  } else {
    // ---------------------------------------------------------
    // DUMMY DATA FOR CREATIVE SUITE DEMO
    // ---------------------------------------------------------
    profile = { display_name: 'Creative Pro', avatar_url: null }

    projects = [
      { id: '1', name: 'Brand Identity', description: 'Rebranding for TechStart including logo and guidelines', status: 'In Progress', due_date: '2025-12-25' },
      { id: '2', name: 'UI/UX Design', description: 'Mobile app interface design for Fintech client', status: 'Planning', due_date: '2026-01-15' },
      { id: '3', name: 'Illustration Set', description: 'Vector assets for marketing campaign', status: 'Completed', due_date: '2025-11-30' },
    ] as any

    files = [
      { id: '1', name: 'Logo_Final.ai', size: 12400000, type: 'image/x-adobe-indesign', created_at: new Date().toISOString() },
      { id: '2', name: 'App_Design.fig', size: 4500000, type: 'application/octet-stream', created_at: new Date().toISOString() },
      { id: '3', name: 'Presentation.pdf', size: 8200000, type: 'application/pdf', created_at: new Date().toISOString() },
      { id: '4', name: 'Assets_Export.zip', size: 156000000, type: 'application/zip', created_at: new Date().toISOString() },
    ] as any

    tasks = [
      { id: '1', title: 'Review Homepage Mockups', status: 'todo', assigned_to: 'me', due_date: '2025-12-12', created_at: new Date().toISOString() },
      { id: '2', title: 'Export Assets for Dev', status: 'in_progress', assigned_to: 'me', due_date: '2025-12-14', created_at: new Date().toISOString() },
      { id: '3', title: 'Client Meeting Preparation', status: 'done', assigned_to: 'me', due_date: '2025-12-10', created_at: new Date().toISOString() },
      { id: '4', title: 'Update Design System', status: 'todo', assigned_to: 'team', due_date: '2025-12-20', created_at: new Date().toISOString() },
    ] as any
  }

  return (
    <DashboardLayout user={profile}>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {profile?.display_name || 'Creator'}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Ready to create something amazing today?
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Tasks Section (New) */}
        <section>
          <DashboardTasks tasks={tasks} />
        </section>

        {/* Active Projects */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Projects</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">View All</Link>
            </Button>
          </div>
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border-2 border-dashed border-border">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <Button asChild>
                <Link href="/projects">Start a project</Link>
              </Button>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Files */}
          <section className="col-span-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Files</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/files">View All</Link>
              </Button>
            </div>
            {files && files.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map((file) => (
                  <FileCard key={file.id} file={file} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border-2 border-dashed border-border">
                <p className="text-muted-foreground">No files yet</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
