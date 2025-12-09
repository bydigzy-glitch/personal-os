import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { FileCard } from '@/components/dashboard/file-card'
import { UploadFileDialog } from '@/components/files/upload-file-dialog'

export default async function FilesPage() {
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

    const { data: files } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <DashboardLayout user={profile}>
            <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Files</h1>
                        <p className="text-gray-600 mt-2">
                            Manage all your creative assets in one place
                        </p>
                    </div>
                    <UploadFileDialog />
                </div>

                {files && files.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {files.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-lg border-2 border-dashed border-gray-300">
                        <div className="max-w-md mx-auto space-y-4">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                                <svg
                                    className="w-8 h-8 text-purple-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                No files yet
                            </h3>
                            <p className="text-gray-500">
                                Upload your first file to get started
                            </p>
                            <UploadFileDialog />
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
