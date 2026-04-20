'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    Home,
    FolderKanban,
    Calendar,
    Users,
    Settings,
    LogOut,
    Menu,
    Search,
    Plus
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '@/components/theme-toggle'

const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Clients', href: '/clients', icon: Users },
]

interface DashboardLayoutProps {
    children: React.ReactNode
    user?: {
        display_name: string | null
        avatar_url: string | null
    } | null
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/auth/sign-in')
    }

    const NavContent = () => (
        <>
            <div className="h-20 flex items-center px-8">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center text-background text-[10px] font-black">
                        P
                    </div>
                    <h1 className="text-sm font-bold tracking-tight uppercase">
                        Productive
                    </h1>
                </div>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300',
                                isActive
                                    ? 'bg-foreground text-background scale-[1.02]'
                                    : 'text-muted-foreground hover:text-foreground hover:translate-x-1'
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-6 border-t border-border mt-auto">
                <button className="flex items-center gap-3 w-full p-2 rounded-xl group transition-all">
                    <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover:ring-foreground/10 transition-all">
                        <AvatarImage src={user?.avatar_url || ''} />
                        <AvatarFallback className="bg-muted text-foreground text-xs">
                            {(user?.display_name || 'U').charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                        <p className="text-xs font-bold leading-tight truncate">
                            {user?.display_name || 'Account'}
                        </p>
                    </div>
                </button>
            </div>
        </>
    )

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex w-64 border-r border-border flex-col bg-card/50">
                <NavContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 flex items-center px-8 gap-6 justify-between">
                    <div className="flex-1 max-w-md relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <input 
                            placeholder="Universal search..." 
                            className="w-full h-10 pl-10 pr-4 bg-muted/50 border border-transparent focus:border-border rounded-xl text-sm outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" className="hidden sm:flex rounded-xl font-bold gap-2">
                             <Plus className="w-4 h-4" />
                             New Action
                        </Button>
                        <ModeToggle />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-muted/20">
                    {children}
                </main>
            </div>
        </div>
    )
}
