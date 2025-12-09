"use client"

import { DataTable } from "./tasks/data-table"
import { columns } from "./tasks/columns"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function DashboardTasks({ tasks }: { tasks: any[] }) {
    return (
        <Card className="col-span-full">
            <CardHeader className="px-6 py-4 border-b">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <div>
                        <CardTitle className="text-lg">My Tasks</CardTitle>
                        <CardDescription>Manage your ongoing tasks and priorities</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="p-4">
                    <DataTable columns={columns} data={tasks} />
                </div>
            </CardContent>
        </Card>
    )
}
