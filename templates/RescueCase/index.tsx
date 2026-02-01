
 
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Siren, Calendar, User, Phone, ChevronRight, Users } from 'lucide-react'
import { showDetail } from './action'
import UserCom from './user'
import user from '@/api/user'
import { Button } from '@/components/ui/button'
import { Assign } from '../Assign/action'
import toast, { Toaster } from 'react-hot-toast'

// const RescueList = () => {
//   const router = useRouter()

// return (
//   // <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
//   //   {/* Header */}
//   //   <div className="flex items-center justify-between">
//   //     <div>
//   //       <h1 className="text-2xl font-bold text-black">Rescue Cases</h1>
//   //       <p className="text-slate-500">Dispatch and track active animal rescue operations.</p>
//   //     </div>

//   //     <button className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-100 transition-all flex items-center gap-2">
//   //       <Siren size={20} />
//   //       Emergency Alert
//   //     </button>
//   //   </div>

//   //   {/* List */}
//   //   <div className="bg-white rounded-3xl border border-black shadow-sm divide-y divide-slate-50 p-5">
//   //     {[1, 2, 3, 4].map((i) => (
//   //       <div
//   //         key={i}
//   //         className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors cursor-pointer group"
//   //         onClick={() => router.push(`/rescues/assign/${i}`)}
//   //       >
//   //         {/* Left Content */}
//   //         <div className="flex gap-6">
//   //           <div
//   //             className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
//   //               i === 1 ? 'bg-red-100 text-red-500' : 'bg-slate-100 text-slate-400'
//   //             }`}
//   //           >
//   //             <Siren size={28} />
//   //           </div>

//   //           <div>
//   //             <div className="flex items-center gap-3 mb-1">
//   //               <h3 className="font-bold text-slate-800 text-lg">Case #RC-80{i}</h3>

//   //               {i === 1 && (
//   //                 <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full uppercase animate-pulse">
//   //                   Critical
//   //                 </span>
//   //               )}
//   //             </div>

//   //             <p className="text-sm text-slate-500 mb-3">
//   //               Injured stray reported near East Side Park complex.
//   //             </p>

//   //             <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
//   //               <span className="flex items-center gap-1.5">
//   //                 <Calendar size={14} /> Oct 24, 2023
//   //               </span>
//   //               <span className="flex items-center gap-1.5">
//   //                 <User size={14} /> Reported by Jane Doe
//   //               </span>
//   //               <span className="flex items-center gap-1.5">
//   //                 <Phone size={14} /> +1 234 567 890
//   //               </span>
//   //             </div>
//   //           </div>
//   //         </div>

//   //         {/* Right Actions */}
//   //         <div className="flex items-center gap-4">
//   //           <div className="text-right hidden md:block">
//   //             <p className="text-xs font-bold text-slate-400 uppercase mb-1">Team</p>

//   //             <div className="flex items-center gap-2 justify-end">
//   //               <button
//   //                 onClick={(e) => {
//   //                   e.stopPropagation()
//   //                   router.push(`/rescues/assign/${i}`)
//   //                 }}
//   //                 className="px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg hover:bg-orange-100 transition-all flex items-center gap-1.5 border border-orange-100"
//   //               >
//   //                 <Users size={14} /> Dispatch
//   //               </button>
//   //             </div>
//   //           </div>

//   //           {/* Arrow Button */}
//   //           <button
//   //             onClick={(e) => {
//   //               e.stopPropagation()
//   //               router.push(`/rescues/assign/${i}`)
//   //             }}
//   //             className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 group-hover:text-orange-500 group-hover:border-orange-100 group-hover:bg-orange-50 transition-all"
//   //           >
//   //             <ChevronRight size={20} />
//   //           </button>
//   //         </div>
//   //       </div>
//   //     ))}
//   //   </div>
//   // </div>
// )
// }
type RescuelistProp = {
  rescueCaseRes: RescueCase[],
  userRes: User[],

}



export default function RescueList({ rescueCaseRes, userRes }: RescuelistProp) {
 
  const [selectRecuse, setSelectedRescuse] = useState<RescueCase | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
//   [2,3,4,5]
  const showDetail = (item: RescueCase) => {
    setSelectedRescuse(item);
  };


  useEffect(() => {
    if (selectRecuse){
      const selected: number[] = []
      selectRecuse.users.map((u) => {
        if (userRes.find((usr) => usr.id === u.id)){
          selected.push(u.id);
        }
      })
      setSelectedUserIds(selected);
    }
  }, [selectRecuse]);



  const isSelected = (id: number) => {
    return selectedUserIds.find((uid) => uid === id)?  true : false
 
  }

  const handleUserClick = (id: number) => {
    if (isSelected(id)){
      setSelectedUserIds(selectedUserIds.filter((uid) => uid !== id));
    }else{
      setSelectedUserIds([...selectedUserIds, id]);
    }
  }

  const sumbit = async() => {
   if (!selectRecuse) return alert("Select rescue case first")

  await Assign(selectRecuse.id, selectedUserIds)
  toast.success("Form submitted successfully!");
  }
  // const detail = showDetail()
  const pending_rescue = rescueCaseRes.filter(v => v.case_status === "Pending");
  return (
    <div className='flex' >
      <div>
        {pending_rescue.map((pr) => (
          <div key={pr.id} className="border p-2 mb-2 rounded">
            <p>Name: {pr.case_title}</p>
            <p>Name: {pr.case_status}</p>
            <button onClick={() => showDetail(pr)}>Show Detail</button>
          </div>
        ))}
      </div>
      {selectRecuse && (
        <div className="mt-4 p-4 border bg-slate-50 rounded">
          <h2 className="font-bold">{selectRecuse.case_title}</h2>
          <p>{selectRecuse.description}</p>
          <p>Status: {selectRecuse.case_status}</p>
        </div>
      )}
      <div>
           {userRes.map((ur) => (
          <UserCom key={ur.id} user = {ur} selected = {isSelected(ur.id)} onClick={() => handleUserClick(ur.id)}   />
        ))}
      </div>
       <Button onClick={sumbit}>Comfirm <Toaster position="top-center" reverseOrder={false}/></Button>
    </div>
   

    
  )
}