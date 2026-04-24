


'use client'
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from 'react';
import { VolunteerCard } from '@/components/VolunteerCard';
import { Animaltable } from "./AnimalTable";
import { useAnimalDialogStore } from "./store";
// import AnimalForm from "./animalform";
import { getAll_RescueCase } from "../RescueCase/action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnimalForm from "./animalform";
import { DataTable } from "@/components/data-table";
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
import { deleteAnimal } from "./action";
// import { Animaltable, VolunteerTable } from '@/components/VolunteerTable';
// import { updateVolunteer } from "./actions"; 
const rescueCase = await getAll_RescueCase('')
type AnimalTemplateProp = {
  animal: Animal[]
  rescueCase: RescueCase[]
}
// const router = useRouter();
//   const navigateAnimalForm = () => {
//     router.push('animal-form');
//   };
// const { setOpen, setAnimal } = useAnimalDialogStore()

// import { deleteProduct } from "./actions"

const columns: ColumnDef<Animal>[] = [
  {
    accessorKey: "tagcode",
    header: "Tagcode",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const img = row.original.image

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
  {
    accessorKey: "species",
    header: "Species",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "health_status",
    header: "Condition",
  },
  {
    accessorKey: "current_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.current_status

      const color =
        status === "rescued"
          ? "bg-green-100 text-green-700"
          : status === "under_treatment"
            ? "bg-amber-100 text-amber-700"
            : "bg-gray-100 text-gray-700"

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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => deleteAnimal(row.original.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function AnimalTemplate({ animal, rescueCase }: AnimalTemplateProp) {
  const CompleteRC = rescueCase.filter(rc => rc.case_status === "Completed");
  const rescuedanimal = animal.filter(a => a.current_status === "rescued");
  const under_treatment = animal.filter(a => a.current_status === "under_treatment");

  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"All" | "rescued" | "under_treatment" | "Adopted">("All")

  const filteredAnimals = animal.filter((a) => {
    const matchesSearch =
      a.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.tagcode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filter === "All" || a.current_status === filter

    return matchesSearch && matchesFilter
  })
  console.log("Animal", animal);
  return (
    <div className="  pb-20 p-4 md:p-8">
      {/* Header */}


      <main className=" mx-auto  sm:px-6 lg:px-8 pt-10 space-y-12 ">

        {/* Pending Section */}
        {/* <section className="">
          <AnimalForm rescueCasesdata={rescueCase}/>
        </section> */}
        <div className="flex items-center justify-between mb-8 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900"> Animal Form</h2>
          </div>
          <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
            {animal.length} Active
          </div>
        </div>

        {/* Accepted Section */}
        <section className="bg-white ">

          <div >
            <AnimalForm rescueCasesdata={CompleteRC} />
          </div>


          <h2 className="text-2xl font-bold text-gray-900">Animal List</h2>
          <p className="text-gray-500 text-sm mt-4 mb-10 ">View and manage Animal Informations.</p>

          {/* <div className="mt-5">
            <Animaltable animals={animal} />
          </div> */}
          <div className="mb-6 space-y-4 flex justify-between mt-6">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              {["All", "rescued", "under_treatment", "Adopted"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${filter === status
                    ? "bg-orange-500 text-white"
                    : "bg-white border text-gray-600"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search by species or tag..."
                className="w-full pl-4 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>


          </div>

          <DataTable columns={columns} data={filteredAnimals} />



          {/* <div className="flex justify-end w-full mb-2"><Link href={'/animal-form'}><Button className=" bg-white border-2 border-black hover:text-white text-black" >Create +</Button></Link></div> */}

        </section>



      </main>

      {/* Footer / Stats sticky bar */}
      
    </div>
  );


}
