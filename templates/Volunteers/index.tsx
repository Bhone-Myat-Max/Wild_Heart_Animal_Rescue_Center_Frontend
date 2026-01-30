
// import { updateVolunteer } from "./actions"; 


// export default function VolunteersTemplate({ Pending_volunteer, Accepted_volunteers}: VolunteersTemplateProp) {

//     // const acceptedVolunteers = volunteers.filter(v => v.status === "Accepted");
//     // const pendingVolunteers = volunteers.filter(v => v.status === "Pending");
//     const handleAccept = async (id: number) => {
//         const formData = new FormData();
//         formData.append("status", "Accepted");

//         await updateVolunteer(id, formData);
//     };

//     return (
//         <div className="">

//             <div className="p-4 grid grid-cols-4 gap-3">
//                 {Pending_volunteer.map((pending_v) => (
//                     <div key={pending_v.id} className="border p-2 mb-2 rounded">
//                         <p>Name: {pending_v.name}</p>
//                         <p>Skill: {pending_v.skill}</p>
//                         <p>Status: {pending_v.status}</p>
//                         <Button disabled={!pending_v.id} onClick={() => pending_v.id && handleAccept(pending_v.id)}>Accept</Button>
//                     </div>
//                 ))}
//             </div>

//             <div className="">
//                 <div className="p-4 ">

//                     {Accepted_volunteers.map((accepted_v) => (
//                         <div key={accepted_v.id} className="border p-2 mb-2 rounded">
//                             <p>Name: {accepted_v.name}</p>
//                             <p>Skill: {accepted_v.skill}</p>
//                             <p>Status: {accepted_v.status}</p>
                            
//                         </div>
//                     ))}

//                     {/* <DataTable columns={columns} data={volunteers} /> */}
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client'
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from 'react';
import { VolunteerCard } from '@/components/VolunteerCard';
import { VolunteerTable } from '@/components/VolunteerTable';
import { updateVolunteer } from "./actions"; 

   type VolunteersTemplateProp = {
    Pending_volunteer: Volunteers[],
    Accepted_volunteers: Volunteers[],
   
}

export default function VolunteersTemplate({ Pending_volunteer, Accepted_volunteers}: VolunteersTemplateProp){

    
const handleAccept = async (id: number) => {
        const formData = new FormData();
        formData.append("status", "Accepted");

        await updateVolunteer(id, formData);
    };
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Volunteer Hub</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">Documentation</button>
            <button className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-sm">Add New</button>
          </div>
        </div>
      </header>

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
          <VolunteerTable acceptedvolunteer={Accepted_volunteers} />
        </section>
      </main>
      
      {/* Footer / Stats sticky bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 py-3 shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 text-sm font-medium text-gray-600">
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
             <span>Total: ?</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-amber-500"></span>
             <span>Pending: {Pending_volunteer.length}</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
             <span>Accepted: {Accepted_volunteers.length}</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
