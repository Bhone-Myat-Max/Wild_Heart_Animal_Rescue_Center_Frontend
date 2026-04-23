


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
const rescueCase = await getAll_RescueCase("")
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
    // {
    //     accessorKey: "current_status",
    //     header: "Rescue",
    // },
    // {
    //     accessorKey: "image",
    //     header: "Image",
    //     cell: ({ row }) => {
    //         return <Image src={row.original.image} alt="cat_img" width={50} height={50} unoptimized/>
    //     }
    // },
    // {
    //     accessorKey: "phone",
    //     header: "Phone",
    // },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         return <div className={row.original.status == "Active" ? "text-green-400" : "text-gray-800"} >{row.original.status}</div>
    //     }
    // },
    {
        accessorKey: "action",
        header: "Actions",
        cell: ({ row }) => {
            // const { setOpen, setDonation } = useDonationDialogStore()
            return <div>
                 {/* <Button onClick={() => { setProduct(row.original); setOpen(true); }}>Edit</Button>
                 <Button onClick={() => deleteProduct(row.original.id!)}>Delete</Button> */}
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      {/* <span className="sr-only">Open menu</span> */}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem >Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={()=>deleteAnimal} >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
        }
    },
]

export default function AnimalTemplate({ animal, rescueCase }: AnimalTemplateProp) {
  const rescuedanimal = animal.filter(a => a.current_status === "rescued");
  const under_treatment = animal.filter(a => a.current_status === "under_treatment");

  console.log("Animal",animal);
  return (
    <div className=" bg-gray-50 pb-20">
      {/* Header */}


      <main className=" mx-auto  sm:px-6 lg:px-8 pt-10 space-y-12 ">

        {/* Pending Section */}
        {/* <section className="">
          <AnimalForm rescueCasesdata={rescueCase}/>
        </section> */}
        <div className="flex items-center justify-between mb-8 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900"> Animals</h2>
            <p className="text-gray-500 text-sm mt-1">View and manage Animal Informations.</p>
          </div>
          <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
            {animal.length} Active
          </div>
        </div>

        {/* Accepted Section */}
        <section className="bg-white ">

          <div >
            <AnimalForm rescueCasesdata={rescueCase} />
          </div>
          {/* <div className="mt-5">
            <Animaltable animals={animal} />
          </div> */}

          <DataTable columns={columns} data={animal}/>



          {/* <div className="flex justify-end w-full mb-2"><Link href={'/animal-form'}><Button className=" bg-white border-2 border-black hover:text-white text-black" >Create +</Button></Link></div> */}

        </section>



      </main>

      {/* Footer / Stats sticky bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 py-3 shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 text-sm font-medium text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>Total: {animal.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Rescued: {rescuedanimal.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>under_treatment: {under_treatment.length}</span>
          </div>
        </div>
      </footer>
    </div>
  );


}
