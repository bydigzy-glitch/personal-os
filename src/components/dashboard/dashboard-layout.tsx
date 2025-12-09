'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    Home,
    FolderKanban,
    FileText,
    Grid3x3,
    BookOpen,
    Users,
    Library,
    Settings,
    LogOut,
    MessageSquare,
    Menu
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '@/components/theme-toggle'
import { NotificationsMenu } from './notifications-menu'
import { CommandMenu } from './command-menu'

const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'My Team', href: '/team', icon: Users },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Files', href: '/files', icon: FileText },
    { name: 'Projects', href: '/projects', icon: FolderKanban, badge: '3' },
    { name: 'Resources', href: '/resources', icon: Library },
    { name: 'Settings', href: '/settings', icon: Settings },
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
            <div className="h-16 flex items-center px-6 border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                        C
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">
                        Creative Suite
                    </h1>
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors group',
                                isActive
                                    ? 'bg-accent text-accent-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn("w-5 h-5 group-hover:text-foreground", isActive ? "text-foreground" : "text-muted-foreground")} />
                                <span>{item.name}</span>
                            </div>
                            {item.badge && (
                                <Badge variant="secondary" className="ml-auto">
                                    {item.badge}
                                </Badge>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-border mt-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent transition-colors outline-none">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={user?.avatar_url || ''} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {(user?.display_name || 'User').charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left hidden sm:block">
                                <p className="text-sm font-medium">
                                    {user?.display_name || 'User'}
                                </p>
                                <Badge variant="secondary" className="mt-1 text-[10px] h-4">
                                    Pro
                                </Badge>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/settings" className="cursor-pointer">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
                <header className="h-16 border-b border-border flex items-center px-6 gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72">
                            <NavContent />
                        </SheetContent>
                    </Sheet>

                    <div className="flex-1 max-w-2xl">
                        <CommandMenu />
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/messages">
                                <MessageSquare className="w-5 h-5" />
                                <span className="sr-only">Messages</span>
                            </Link>
                        </Button>
                        <NotificationsMenu />
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
