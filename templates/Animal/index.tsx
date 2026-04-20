


'use client'
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from 'react';
import { VolunteerCard } from '@/components/VolunteerCard';
import { Animaltable } from "./AnimalTable";
import { useAnimalDialogStore } from "./store";
import AnimalForm from "./animalform";
import { getAll_RescueCase } from "../RescueCase/action";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { Animaltable, VolunteerTable } from '@/components/VolunteerTable';
// import { updateVolunteer } from "./actions"; 
     const rescueCase = await getAll_RescueCase("")
   type AnimalTemplateProp = {
    animal: Animal[]
}
// const router = useRouter();
//   const navigateAnimalForm = () => {
//     router.push('animal-form');
//   };
  // const { setOpen, setAnimal } = useAnimalDialogStore()

export default function AnimalTemplate({animal}: AnimalTemplateProp){
    const rescuedanimal = animal.filter(a => a.current_status === "rescued");
    const under_treatment = animal.filter(a => a.current_status === "under_treatment");

    console.log("Animal",animal);
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
  

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12 ">

          {/* Pending Section */}
        {/* <section className="">
          <AnimalForm rescueCasesdata={rescueCase}/>
        </section> */}

                {/* Accepted Section */}
        <section className="bg-white p-4">
          <div className="flex items-center justify-between mb-8 bg-white">
            <div>
              <h2 className="text-2xl font-bold text-gray-900"> Animals</h2>
              <p className="text-gray-500 text-sm mt-1">View and manage Animal Informations.</p>
            </div>
            <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
              {animal.length} Active
            </div>
          </div>
          <div className="flex justify-end w-full mb-2"><Link href={'/animal-form'}><Button className=" bg-white border-2 border-black hover:text-white text-black" >Create +</Button></Link></div>
          <Animaltable animals={animal} />
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
