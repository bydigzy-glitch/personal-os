import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ProjectCard } from '@/components/dashboard/project-card'
import { FileCard } from '@/components/dashboard/file-card'
import { AppCard } from '@/components/dashboard/app-card'
import { Button } from '@/components/ui/button'
import { Plus, Palette, PenTool, Layout, Monitor } from 'lucide-react'
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

    apps = [
      { id: '1', name: 'Figma', description: 'Interface Design', icon_url: null, category: 'design' },
      { id: '2', name: 'Photoshop', description: 'Image Editing', icon_url: null, category: 'design' },
      { id: '3', name: 'Illustrator', description: 'Vector Graphics', icon_url: null, category: 'design' },
    ] as any
  }

  return (
    <DashboardLayout user={profile}>
      <div className="p-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {profile?.display_name || 'Creator'}!
            </h1>
            <p className="text-gray-600 mt-2">
              Ready to create something amazing today?
            </p>
          </div>
          <Button className="bg-black hover:bg-gray-800 text-white gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Recent Apps */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Creative Tools</h2>
            <Button variant="ghost" size="sm" asChild>
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
              <p className="text-gray-500">No tools connected</p>
            </div>
          )}
        </section>

        {/* Active Projects */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
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
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">No projects yet</p>
              <Button asChild>
                <Link href="/projects">Start a project</Link>
              </Button>
            </div>
          )}
        </section>

        {/* Recent Files */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Files</h2>
            <Button variant="ghost" size="sm" asChild>
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
      </div>
    </DashboardLayout>
  )
}
