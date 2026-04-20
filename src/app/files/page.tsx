import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Button } from '@/components/ui/button'
import { FolderPlus, Radio } from 'lucide-react'
import { FileCard } from '@/components/dashboard/file-card'
import { UploadFileDialog } from '@/components/files/upload-file-dialog'

export default async function FilesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let files: any[] = []

    if (user) {
        const { data: fetchedFiles } = await supabase
            .from('files')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            
        files = fetchedFiles || []
    }

    return (
        <DashboardLayout>
            <div className="p-8 max-w-[1600px] mx-auto space-y-8">
                {/* Action Bar */}
                <div className="flex items-center gap-3">
                    <UploadFileDialog />
                    <Button variant="outline" className="rounded-lg px-4 border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                        <FolderPlus className="w-4 h-4 mr-2" />
                        Create folder
                    </Button>
                    <Button variant="outline" className="rounded-lg px-4 border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                        <Radio className="w-4 h-4 mr-2" />
                        Record
                    </Button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files.length > 0 ? (
                        files.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                            <p>No files uploaded yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
