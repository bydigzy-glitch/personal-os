import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ProjectCard } from '@/components/dashboard/project-card'
import { FileCard } from '@/components/dashboard/file-card'
import { Button } from '@/components/ui/button'
import { Plus, ArrowUpRight, Calendar, CreditCard, Sparkles, Zap, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { DashboardTasks } from '@/components/dashboard/dashboard-tasks'
import { CreateProjectDialog } from '@/components/projects/create-project-dialog'
import { Badge } from '@/components/ui/badge'

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
      .limit(5)
    tasks = fetchedTasks || []

  } else {
    profile = { display_name: 'Creative Pro', avatar_url: null }
    projects = [
      { id: '1', title: 'Brand Identity', description: 'Rebranding for TechStart including logo and guidelines', status: 'active', due_date: '2026-04-25' },
      { id: '2', title: 'UI/UX Design', description: 'Mobile app interface design for Fintech client', status: 'active', due_date: '2026-05-15' },
    ] as any
    files = []
    tasks = [
      { id: '1', title: 'Review Homepage Mockups', status: 'todo', due_date: '2026-04-20' },
      { id: '2', title: 'Export Assets for Dev', status: 'in_progress', due_date: '2026-04-21' },
    ] as any
  }

  return (
    <DashboardLayout user={profile}>
      <div className="p-8 space-y-10 max-w-[1600px] mx-auto animate-enter">
        {/* Top Section: Welcome & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 bg-amber-500/10 text-amber-600 rounded">
                <Sparkles className="w-4 h-4 fill-amber-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600/80">Pro Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter">
              Morning, {profile?.display_name?.split(' ')[0] || 'Creator'}.
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              You have <span className="text-foreground font-semibold">2 active sprints</span> and <span className="text-foreground font-semibold">1 pending invoice</span> today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="lg" className="rounded-xl border-border shadow-none" asChild>
                <Link href="/calendar">
                    <Calendar className="w-4 h-4 mr-2" />
                    Timeline
                </Link>
            </Button>
            <CreateProjectDialog />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 transition-all hover:border-foreground/20">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
                        <CreditCard className="w-5 h-5" />
                    </div>
                    <Badge variant="emerald" className="h-5">+12%</Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Output</p>
                <p className="text-2xl font-bold tracking-tight mt-1">$14,200.00</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 transition-all hover:border-foreground/20">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600">
                        <Zap className="w-5 h-5" />
                    </div>
                    <Badge variant="blue" className="h-5">85%</Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency Pulse</p>
                <p className="text-2xl font-bold tracking-tight mt-1">High</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 transition-all hover:border-foreground/20">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600">
                        <Clock className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="h-5 font-mono">1.2h</Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Sync Time</p>
                <p className="text-2xl font-bold tracking-tight mt-1">Optimized</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 bg-foreground text-background">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center text-background">
                        <Sparkles className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-sm font-medium opacity-80">Next Leap</p>
                <p className="text-lg font-bold tracking-tight mt-1 leading-tight">Focus on Branding Phase 2 today.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Column: Tasks & Projects */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Active Sprints</h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                  <Link href="/projects" className="flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Priority Tasks</h2>
                </div>
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <DashboardTasks tasks={tasks} />
                </div>
            </section>
          </div>

          {/* Right Column: Files & Tools */}
          <div className="space-y-10">
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold tracking-tight">Recent Assets</h2>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/files" className="text-muted-foreground hover:text-foreground">
                            Library
                        </Link>
                    </Button>
                </div>
                <div className="space-y-3">
                    {files.length > 0 ? (
                        files.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))
                    ) : (
                        <div className="p-12 text-center border-2 border-dashed border-border rounded-2xl">
                             <p className="text-sm text-muted-foreground">No assets found</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-muted/30 p-6 rounded-2xl border border-border">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Quick Tools</h2>
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-16 flex-col gap-1 rounded-xl bg-card border-border hover:bg-muted" asChild>
                        <Link href="/tools">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span className="text-[10px] font-bold">Contrast</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col gap-1 rounded-xl bg-card border-border hover:bg-muted" asChild>
                        <Link href="/tools">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <span className="text-[10px] font-bold">Moodboard</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col gap-1 rounded-xl bg-card border-border hover:bg-muted" asChild>
                        <Link href="/tools">
                            <Clock className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-bold">Invoicing</span>
                        </Link>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col gap-1 rounded-xl bg-card border-border hover:bg-muted" asChild>
                        <Link href="/tools">
                            <Plus className="w-4 h-4 text-muted-foreground opacity-50" />
                            <span className="text-[10px] font-bold">More</span>
                        </Link>
                    </Button>
                </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
