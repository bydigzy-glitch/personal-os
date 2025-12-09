import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ProjectCard } from '@/components/dashboard/project-card'
import { FileCard } from '@/components/dashboard/file-card'
import { AppCard } from '@/components/dashboard/app-card'
import { Button } from '@/components/ui/button'
import { Plus, FolderKanban, FileIcon, Grid } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Try to get real user, but don't enforce it
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  let projects: any[] = []
  let files: any[] = []
  let apps: any[] = []

  if (user) {
    // Real Data Fetching if User Exists
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

    const { data: fetchedApps } = await supabase
      .from('apps')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(6)
    apps = fetchedApps || []

  } else {
    // ---------------------------------------------------------
    // DUMMY DATA FOR PUBLIC DEMO MODE
    // ---------------------------------------------------------
    profile = { display_name: 'Demo User', avatar_url: null }

    projects = [
      { id: '1', name: 'Website Redesign', description: 'Redesigning the corporate website', status: 'In Progress', due_date: '2025-12-25' },
      { id: '2', name: 'Mobile App', description: 'Flutter app for iOS and Android', status: 'Planning', due_date: '2026-01-15' },
      { id: '3', name: 'Marketing Campaign', description: 'Q4 Social Media Assets', status: 'Completed', due_date: '2025-11-30' },
    ] as any

    files = [
      { id: '1', name: 'Proposal.pdf', size: 2400000, type: 'application/pdf', created_at: new Date().toISOString() },
      { id: '2', name: 'Design_Mockup.png', size: 4100000, type: 'image/png', created_at: new Date().toISOString() },
      { id: '3', name: 'Budget.xlsx', size: 1200000, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', created_at: new Date().toISOString() },
    ] as any

    apps = [
      { id: '1', name: 'Slack', description: 'Team communication', icon_url: null },
      { id: '2', name: 'Notion', description: 'Notes & Wiki', icon_url: null },
      { id: '3', name: 'Linear', description: 'Issue tracking', icon_url: null },
    ] as any
  }

  return (
    <DashboardLayout user={profile}>
      <div className="p-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.display_name || 'Guest'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Active Projects */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Active Projects</h2>
            <Button asChild>
              <Link href="/projects">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">No projects yet</p>
              <Button asChild>
                <Link href="/projects">Create your first project</Link>
              </Button>
            </div>
          )}
        </section>

        {/* Recent Files */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Files</h2>
            <Button variant="outline" asChild>
              <Link href="/files">View All</Link>
            </Button>
          </div>
          {files && files.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {files.map((file) => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">No files yet</p>
            </div>
          )}
        </section>

        {/* Recent Apps */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Apps</h2>
            <Button variant="outline" asChild>
              <Link href="/apps">View All</Link>
            </Button>
          </div>
          {apps && apps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">No apps yet</p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  )
}
