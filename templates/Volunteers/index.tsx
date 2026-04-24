
'use client'
import { Button } from "@/components/ui/button";
import React, { useState, useCallback, useMemo } from 'react';
import { VolunteerCard } from '@/components/VolunteerCard';
import { VolunteerTable } from '@/components/VolunteerTable';
import { updateVolunteer } from "./actions";
import { DataTable } from "@/components/data-table";

type VolunteersTemplateProp = {
  Pending_volunteer: Volunteers[],
  Accepted_volunteers: Volunteers[],

}
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Eye, MoreHorizontalIcon, Search, Trash } from "lucide-react";

export default function VolunteersTemplate({ Pending_volunteer, Accepted_volunteers }: VolunteersTemplateProp) {

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"All" | "Accepted" | "Pending">("All");
  const filteredVolunteers = useMemo(() => {
    return Accepted_volunteers.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter =
        filter === "All" || v.status === filter

      return matchesSearch && matchesFilter
    })
  }, [searchTerm, filter, Accepted_volunteers])
  const handleAccept = async (id: number) => {
    const formData = new FormData();
    formData.append("status", "Accepted");

    await updateVolunteer(id, formData);
  };
  const columns: ColumnDef<Volunteers>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "name" },
    { accessorKey: "skill", header: "skill" },
    { accessorKey: "availability", header: "availability" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        const color = status === "Accepted" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
        return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{status}</span>
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
            <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
              <DropdownMenuItem onClick={() => console.log("View", rescue)}>
                <Eye className="mr-2 size-4" /> View
              </DropdownMenuItem>

              {/*  CONNECTED EDIT ACTION */}
              <DropdownMenuItem
              >
                <Edit className="mr-2 size-4" /> Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash className="mr-2 size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Pending Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Pending Requests</h2>
              <p className="text-gray-500 text-sm mt-1">Review and approve new volunteer applications.</p>
            </div>
            <div className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">
              {Pending_volunteer.length} Awaiting
            </div>
          </div>

          {Pending_volunteer.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Pending_volunteer.map(pending_v => (
                <VolunteerCard
                  key={pending_v.id}
                  pending_volunteer={pending_v}
                  onAccept={handleAccept}
                />

                // <div key={pending_v.id} className="border p-2 mb-2 rounded">
                //     <p>Name: {pending_v.name}</p>
                //     <p>Skill: {pending_v.skill}</p>
                //     <p>Status: {pending_v.status}</p>
                //     <Button disabled={!pending_v.id} onClick={() => pending_v.id && handleAccept(pending_v.id)}>Accept</Button>
                // </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
              <p className="text-gray-500">No new applications to review.</p>
            </div>
          )}
        </section>

        {/* Accepted Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Active Volunteers</h2>
              <p className="text-gray-500 text-sm mt-1">View and manage currently active team members.</p>
            </div>
            <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
              {Accepted_volunteers.length} Active
            </div>
          </div>
          {/* 🔍 SEARCH + FILTER */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

              {/* FILTER BUTTONS */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {["All", "Accepted", "Pending"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status as any)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === status
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300"
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {/* SEARCH */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all shadow-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

            </div>


          </div>
          <DataTable columns={columns} data={filteredVolunteers} />

          {/* <VolunteerTable acceptedvolunteer={Accepted_volunteers} /> */}
        </section>
      </main>

      {/* Footer / Stats sticky bar */}
      
    </div>
  );


}
