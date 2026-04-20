

'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Siren, Calendar, User, Phone, ChevronRight, Users, Filter, Clock, MapPin } from 'lucide-react'
import { showDetail } from './action'
import UserCom from './user'
import user from '@/api/user'
import { Button } from '@/components/ui/button'
import { Assign } from '../Assign/action'
import toast, { Toaster } from 'react-hot-toast'
// import UserCard from './detail'


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
    if (!selectRecuse) return alert("Select rescue case first")
      
    await Assign(selectRecuse.id, selectedUserIds)
    toast.success("Form submitted successfully!")
    // toast.promise(
    //   new Promise(resolve => setTimeout(resolve, 1000)),
    //   {
    //     loading: 'Assigning team...',
       
    //   }
    // ).then(() => {
    //   setSelectedRescuse(null);
    //   setSelectedUserIds([]);
    // });
  };
  // const detail = showDetail()
  const pending_rescue = rescueCaseRes.filter(v => v.case_status === "Pending");
  return (
    <div className='flex bg-gray-50' >
      <div className="max-w-7xl  px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
        {pending_rescue.map((pr) => (
          <div key={pr.id} className="border p-2 mb-2 rounded w-full h-40 bg-white shadow-2xl">
            <h1>{pr.case_title}</h1>
            <p> {pr.case_status}</p>
            <button onClick={() => showDetail(pr)}>Show Detail</button>
          </div>
        ))}
      </div>
    </div>
      {pending_rescue.length === 0 && (
        <div className='w-full'>
          <div className='flex justify-between'>
            <h1 className='text-2xl mb-4'>Requested Rescue Cases</h1>
            <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider flex items-center">
              {pending_rescue.length} Requests
            </div>
          </div>
          
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 w-full">
          <Siren size={48} className="mb-4 opacity-20" />
          <p className="text-lg font-medium">No pending cases found</p>
        </div>
        </div>
      )}


      {/* Detail Pannel */}
      {selectRecuse && (
        // <div className="mt-4 p-4 border bg-slate-50 rounded">
        //   <h2 className="font-bold">{selectRecuse.case_title}</h2>
        //   <p>{selectRecuse.description}</p>
        //   <p>Status: {selectRecuse.case_status}</p>
        //   <div> {userRes.map((ur) => (
        //   <UserCom key={ur.id} user = {ur} selected = {isSelected(ur.id)} onClick={() => handleUserClick(ur.id)}/>))}</div>
        //   <Button onClick={sumbit}>Comfirm <Toaster position="top-center" reverseOrder={false}/></Button>
        // </div>

        <div className="flex flex-col  overflow-hidden bg-white shadow-2xl">
          {/* Detail Header */}
          <div className="p-6 border-b border-slate-100 shrink-0 ">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedRescuse(null)}
                className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
              {/* <PriorityBadge priority={selectRecuse.priority_level} /> */}
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Clock size={12} /> {selectRecuse.updated_at}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
              {selectRecuse.case_title}
            </h3>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={16} />
              {selectRecuse.location}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Incident Description</h4>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectRecuse.description}
              </p>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assign Responders</h4>
                <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                  {selectedUserIds.length} Selected
                </span>
              </div>
              <div className="space-y-3">
                {userRes.map((user) => (
                  <UserCom key={user.id} user={user} selected={isSelected(user.id)} onClick={() => handleUserClick(user.id)} />

                ))}
              </div>
            </section>
          </div>

          {/* Sticky Actions */}
          <div className="p-6 border-t border-slate-100 bg-white/80 backdrop-blur-md sticky bottom-0">
            <Button onClick={sumbit} className='w-full bg-orange-700 h-10  hover:bg-orange-600'>Deploy Emergency Team <Toaster position="top-center" reverseOrder={false} /></Button>
            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
              Deployments are logged and tracked in real-time
            </p>
          </div>
        </div>
      )}


      {/* <div className={`${selectRecuse ? 'flex' : 'hidden'} lg:flex w-full lg:w-[450px] xl:w-[500px] flex-col border-l border-slate-200 bg-white shadow-2xl lg:shadow-none z-50`}>
        {selectRecuse ? (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setSelectedRescuse(null)}
                  className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full"
                >
                  <ChevronRight size={24} className="rotate-180" />
                </button>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock size={12} /> {selectRecuse.updated_at}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                {selectRecuse.case_title}
              </h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={16} />
                {selectRecuse.location}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <section>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Incident Description</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {selectRecuse.description}
                </p>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assign Responders</h4>
                  <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                    {selectedUserIds.length} Selected
                  </span>
                </div>
                <div className="space-y-3">
                  {userRes.map((user) => (
                              <UserCom key={user.id} user = {user} selected = {isSelected(user.id)} onClick={() => handleUserClick(user.id)}/>

                  ))}
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white/80 backdrop-blur-md sticky bottom-0">
                <Button onClick={sumbit} className='w-full bg-orange-700 h-10  hover:bg-orange-600'>Deploy Emergency Team <Toaster position="top-center" reverseOrder={false}/></Button>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
                Deployments are logged and tracked in real-time
              </p>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex flex-col items-center justify-center h-full text-slate-300 p-12 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Filter size={32} />
            </div>
            <h4 className="text-slate-900 font-bold mb-2">No Case Selected</h4>
            <p className="text-sm">Select a rescue case from the dashboard to view details and assign personnel.</p>
          </div>
        )}
      </div>*/}

    </div>
  );
};





