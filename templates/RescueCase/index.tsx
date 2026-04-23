

'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Siren, Calendar, User, Phone, ChevronRight, Users, Filter, Clock, MapPin, Eye, Edit, Delete, Trash2, Trash, ShieldAlert } from 'lucide-react'
import { showDetail } from './action'
import UserCom from './user'
import user from '@/api/user'
import { Button } from '@/components/ui/button'
import { Assign } from '../Assign/action'
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
import { MoreHorizontalIcon } from "lucide-react"
// import {useDonationDialogStore} from "./store"
import { DataTable } from '@/components/data-table'
import { Spinner } from '@/components/ui/spinner'
import AssignDialog from './AssignDialog'
import RescueDetailDialog from './detailDialog'
type RescuelistProp = {
  rescueCaseRes: RescueCase[],
  userRes: User[],

}





export default function RescueList({ rescueCaseRes, userRes }: RescuelistProp) {

  const [selectRecuse, setSelectedRescuse] = useState<RescueCase | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false)
  // const [open, setOpen] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedRescue, setSelectedRescue] = useState<RescueCase | null>(null)

  const openViewDialog = (rescue: RescueCase) => {
    setSelectedRescue(rescue)
    setDetailOpen(true)
  }
  //   [2,3,4,5]
  const showDetail = (item: RescueCase) => {
    setSelectedRescuse(item);
  };



  const columns: ColumnDef<RescueCase>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "case_number",
      header: "Case Number",
    },
    {
      accessorKey: "case_title",
      header: "Title",
    },
    {
      accessorKey: "reported_by",
      header: "Reported By",
    },
    {
      accessorKey: "priority_level",
      header: "Priority",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "case_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.case_status

        const color =
          status === "Completed"
            ? "bg-green-100 text-green-700"
            : status === "In Progress"
              ? "bg-orange-100 text-orange-700"
              : "bg-gray-100 text-gray-600"

        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
            {status}
          </span>
        )
      },
    },
    {
      id: "action",
      header: "Actions",
      cell: ({ row }) => {
        const rescue = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {/* 👁 VIEW */}
              <DropdownMenuItem onClick={() => openViewDialog(rescue)}>
                <Eye />View
              </DropdownMenuItem>

              {/* ✏️ EDIT */}
              <DropdownMenuItem>
                <Edit />Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* 🗑 DELETE */}
              <DropdownMenuItem variant="destructive">
                {/* <Trash2/> Delete */}<Trash />Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]



  useEffect(() => {
    if (selectRecuse) {
      const selected: number[] = []
      selectRecuse.users.map((u) => {
        if (userRes.find((usr) => usr.id === u.id)) {
          selected.push(u.id);
        }
      })
      setSelectedUserIds(selected);
    }
  }, [selectRecuse]);



  const isSelected = (id: number) => {
    return selectedUserIds.find((uid) => uid === id) ? true : false

  }

  const handleUserClick = (id: number) => {
    if (isSelected(id)) {
      setSelectedUserIds(selectedUserIds.filter((uid) => uid !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  }

  //Submit function
  const sumbit = async () => {
    setLoading(true)
    if (!selectRecuse) {
      alert("Select rescue case first")
      return
    }

    if (selectedUserIds.length === 0) {
      toast.error("Select Rescue Team First")
      setLoading(false)
      return
    }

    await Assign(selectRecuse.id, selectedUserIds)
    toast.success("Rescue Team Sended")
  }
  // const detail = showDetail()
  const pending_rescue = rescueCaseRes.filter(v => v.case_status === "Pending");
  return (
    <div className='p-4 md:p-8'>

      <div className='flex bg-gray-50' >
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            {/* <div className="p-1.5 bg-orange-600 rounded-lg text-white shadow-lg shadow-orange-200">
              <ShieldAlert size={18} />
            </div> */}
            <h1 className="text-3xl font-black text-black  ml-3">Pending Requests</h1>
          </div>
          <p className="text-sm text-slate-700 font-medium ml-3">Urgent cases requiring immediate team assignment</p>
        </div>
        {/* {pending_rescue.length > 0 && (
          <div className="px-4 py-1.5 bg-white border border-slate-100 text-orange-600 text-[11px] font-black rounded-full uppercase tracking-widest shadow-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
            {pending_rescue.length} Active Requests
          </div>
        )} */}
      </div>
      <div>
        <div className="max-w-7xl  py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {pending_rescue.map((pr) => (
              <div
                key={pr.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                {/* Top */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {pr.case_title}
                    </h2>
                    <p className="text-xs text-gray-400">
                      #{pr.case_number}
                    </p>
                  </div>

                  {/* Priority Badge */}
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full
      ${pr.priority_level === "High"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"}
    `}>
                    {pr.priority_level}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{pr.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{pr.reported_by}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{pr.case_status}</span>
                  </div>
                </div>

                {/* Bottom */}
                <button
                  onClick={() => {
                    setSelectedRescuse(pr)
                    setAssignOpen(true)
                  }}
                  className="w-full py-2 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700"
                >
                  Assign Team
                </button>
              </div>
            ))}
          </div>
        </div>
        {pending_rescue.length === 0 && (
          <div className='w-full mb-5'>
            

            <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white border-2  border-slate-200 rounded-3xl text-slate-700 w-full">
              <Siren size={48} className="mb-4 " />
              <p className="text-lg font-medium">No pending cases found</p>
            </div>
          </div>
        )}
        <AssignDialog
          open={assignOpen}
          onClose={() => setAssignOpen(false)}
          rescue={selectRecuse}
          users={userRes}
        />

        <RescueDetailDialog
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          rescue={selectedRescue}
        />


        {/* Detail Pannel */}






      </div>

      <div>
        <DataTable columns={columns} data={rescueCaseRes} />
      </div>

    </div>

  )
};





