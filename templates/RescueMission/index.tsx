'use client'
import { Button } from "@/components/ui/button"
import MissionDialog from "./MissionDialog"
import toast, { Toaster } from 'react-hot-toast'
// import UserCard from './detail'

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from '@/components/data-table'
import { Siren, Calendar, User, Phone, ChevronRight, Users, Filter, Clock, MapPin, Eye, Edit, Delete, Trash2, Trash, ShieldAlert, MoreHorizontalIcon, Plus } from 'lucide-react'
import { useState } from "react"
import { DeleteMission } from "./action"


type MissionProp = {
    mission: RescueMission[]
}



export default function RescueMissionTemplate({ mission }: MissionProp) {
    console.log(mission);
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // 2. State for the selected rescue (null = Create mode, object = Edit mode)
    const [selectedRescue, setSelectedRescue] = useState<any | null>(null)

    // Helper to open for Create
    const handleCreate = () => {
        setSelectedRescue(null)
        setIsDialogOpen(true)
    }

    // Helper to open for Edit
    const handleEdit = (mission: any) => {
        setSelectedRescue(mission)
        setIsDialogOpen(true)
    }

    const columns: ColumnDef<RescueMission>[] = [
        // { accessorKey: "id", header: "ID" },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => {
                const img = row.original.image_url

                return (
                    <Image
                        src={img || "/placeholder.png"}
                        alt="animal"
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                        unoptimized
                    />
                )
            },
        },
        { accessorKey: "title", header: "title" },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div className="max-w-62.5 truncate" title={row.original.description}>
                    {row.original.description}
                </div>
            ),
        },
        { accessorKey: "category", header: "category" },
        { accessorKey: "target_amount", header: "Target Donation" },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status
                const color = status === "completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{status}</span>
            },
        },
        {
            id: "action",
            header: "Actions",
            cell: ({ row }) => {
                const mission = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                                <MoreHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                            {/* <DropdownMenuItem onClick={() => console.log("View", mission)}>
                                <Eye className="mr-2 size-4" /> View
                            </DropdownMenuItem> */}

                            {/* ✏️ CONNECTED EDIT ACTION */}
                            <DropdownMenuItem onClick={() => handleEdit(mission)}>
                                <Edit className="mr-2 size-4" /> Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={() => DeleteMission(mission.id)}>
                                <Trash className="mr-2 size-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
    return (
        <div className="space-y-4 p-4 md:p-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900">Mission Management</h2>

                {/* ➕ CONNECTED CREATE BUTTON */}
                <Button
                    onClick={handleCreate}
                    className="bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold gap-2"
                >
                    <Plus size={18} />
                    New Mission
                </Button>
            </div>

            <div>
                <DataTable columns={columns} data={mission} />
            </div>

            <MissionDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                rescueMission={selectedRescue}
            />
        </div>
    )
}