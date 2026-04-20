'use client'

import React from 'react'
import { Dog, Users, HandCoins, HeartPulse, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const StatCard = ({ title, value, icon }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
          {icon}
        </div>
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  )
}

// type Donation = {
//   amount: number | string
// }

type Volunteers = {
  id: number
}

type DonationProp = {
  volunteer: Volunteers[]
  donation: Donation[]
  rescue_case: RescueCase[]
}

export default function Dashboard({ volunteer, donation, rescue_case }: DonationProp) {

  const totalVolunteer = volunteer.length

  const totalDonation = donation.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const pending_rescue = rescue_case.filter(rc => rc.case_status === "Pending");

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Animals" value={152} icon={<Dog size={24} />} />
        <StatCard title="Volunteers" value={totalVolunteer} icon={<Users size={24} />} />
        <StatCard title="Total Donations" value={`$${totalDonation}`} icon={<HandCoins size={24} />} />
        <StatCard title="Pending Rescues" value={pending_rescue.length} icon={<HeartPulse size={24} />} />
      </div>
      
      {/* Recent Donations */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
       <div className='flex flex-2 justify-between'>
         <h3 className="text-lg font-bold text-slate-800 mb-8">Recent Donations</h3>
         <Button className=''>View</Button>
       </div>

        <div className="space-y-6">
          {donation.map((d) => (
            <div key={d.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{d.name}</p>
                  <p className="text-xs text-slate-500">{d.email}</p>
                </div>
              </div>
              <p className="font-bold text-green-600">+${d.amount}</p>
            </div>
          ))}
        </div>
      </div>

    </div>

  )
}
