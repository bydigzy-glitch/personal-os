"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    Settings,
    User,
    FileText,
    FolderKanban,
    Calendar,
    CreditCard,
    Wrench,
    Library,
    Plus,
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = (command: () => void) => {
        setOpen(false)
        command()
    }

    return (
        <>
            <Button
                variant="outline"
                className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 bg-background/50 hover:bg-accent/50 rounded-xl"
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">Search everything...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="max-h-[400px]">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Quick Actions">
                        <CommandItem onSelect={() => runCommand(() => router.push('/projects'))}>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Create New Project</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/billing'))}>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>New Invoice</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Navigation">
                        <CommandItem onSelect={() => runCommand(() => router.push('/calendar'))}>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Timeline</span>
                            <CommandShortcut>⌘T</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/projects'))}>
                            <FolderKanban className="mr-2 h-4 w-4" />
                            <span>Projects</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/billing'))}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing & Finance</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/tools'))}>
                            <Wrench className="mr-2 h-4 w-4" />
                            <span>Utility Suite</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/files'))}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Asset Library</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/resources'))}>
                            <Library className="mr-2 h-4 w-4" />
                            <span>Inspiration Hub</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Account">
                        <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
