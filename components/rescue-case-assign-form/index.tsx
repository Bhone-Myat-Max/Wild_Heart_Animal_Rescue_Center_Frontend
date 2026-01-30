'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Siren, MapPin, User as UserIcon, Calendar, Clock,
  Plus, Search, Phone, Mail, CheckCircle,
  AlertCircle, ShieldCheck, ChevronLeft, Users,
  MoreVertical, Trash2
} from 'lucide-react'

// Types (you can move this to types.ts)
type RescueCase = {
  id: string
  case_title: string
  reported_by: string
  location: string
  description: string
  priority_level: string
  case_status: string
  created_at: string
}

type User = {
  id: string
  name: string
  phone: string
  email: string
  status: string
  availability_status: string
  role: string
}

// Mock Data
const mockCase: RescueCase = {
  id: '3',
  case_title: 'Snake in House',
  reported_by: 'U Min Lwin',
  location: 'Bahan Township, Yangon',
  description:
    'A snake entered a house and residents are afraid. It is spotted in the kitchen area near the cabinets.',
  priority_level: 'Emergency',
  case_status: 'Pending',
  created_at: '2026-01-30T03:03:35.000000Z',
}

const availableUsers: User[] = [
  { id: '1', name: 'May Thu Aung', phone: '09-234-567-890', email: 'maythu@gmail.com', status: 'Active', availability_status: 'Free', role: 'Rescue Specialist' },
  { id: '2', name: 'Kyaw Zayar', phone: '09-111-222-333', email: 'kyawzayar@gmail.com', status: 'Active', availability_status: 'Free', role: 'Vet Assistant' },
  { id: '3', name: 'Su Su Hlaing', phone: '09-444-555-666', email: 'susu@gmail.com', status: 'Active', availability_status: 'Busy', role: 'Driver' },
  { id: '4', name: 'Aung Ko Ko', phone: '09-777-888-999', email: 'aungko@gmail.com', status: 'Active', availability_status: 'Free', role: 'Specialist' },
]

export default function RescueAssignment() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [assignedUsers, setAssignedUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const toggleUser = (user: User) => {
    if (assignedUsers.find(u => u.id === user.id)) {
      setAssignedUsers(assignedUsers.filter(u => u.id !== user.id))
    } else {
      setAssignedUsers([...assignedUsers, user])
    }
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      router.push('/rescues')
    }, 1500)
  }

  const filteredUsers = availableUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/rescues')}
            className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-orange-500 rounded-xl transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dispatch Team</h1>
            <p className="text-slate-500 text-sm">Assign personnel to Case #{id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-400 mr-2">
            {assignedUsers.length} Selected
          </span>

          <button
            onClick={handleSave}
            disabled={assignedUsers.length === 0 || isSaving}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all flex items-center gap-2"
          >
            {isSaving ? <Clock className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
            Confirm Assignment
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT: Case Info */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className={`p-6 flex items-center justify-between ${
              mockCase.priority_level === 'Emergency' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
            }`}>
              <div className="flex items-center gap-3">
                <Siren size={24} className="animate-pulse" />
                <h2 className="font-bold text-lg">{mockCase.case_title}</h2>
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase">
                {mockCase.priority_level}
              </span>
            </div>

            <div className="p-8 space-y-6">
              <p className="font-semibold flex items-center gap-2">
                <UserIcon size={16} className="text-orange-500" />
                {mockCase.reported_by}
              </p>

              <p className="font-semibold flex items-center gap-2">
                <MapPin size={16} className="text-red-500" />
                {mockCase.location}
              </p>

              <p className="text-sm text-slate-600 italic bg-orange-50 p-4 rounded-xl">
                {mockCase.description}
              </p>
            </div>
          </section>
        </div>

        {/* RIGHT: Staff Selection */}
        <div className="lg:col-span-7 space-y-6">

          {/* Search */}
          <section className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Users className="text-orange-500" /> Assemble Team
              </h3>

              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search staff..."
                  className="pl-10 pr-4 py-2 border rounded-xl text-sm bg-slate-50 outline-none"
                />
              </div>
            </div>

            {/* Staff List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[250px] overflow-y-auto">
              {filteredUsers.map(user => {
                const selected = assignedUsers.find(u => u.id === user.id)

                return (
                  <button
                    key={user.id}
                    onClick={() => toggleUser(user)}
                    className={`p-4 border rounded-xl flex justify-between items-center ${
                      selected ? 'bg-orange-50 border-orange-500' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center font-bold">
                        {user.name[0]}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.role}</p>
                      </div>
                    </div>
                    {selected ? <CheckCircle className="text-orange-500" /> : <Plus className="text-slate-300" />}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Assigned Staff */}
          <section className="space-y-3">
            <h3 className="font-bold text-lg">
              Current Team ({assignedUsers.length})
            </h3>

            {assignedUsers.map(user => (
              <div key={user.id} className="bg-white p-4 border rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.role}</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => toggleUser(user)} className="text-red-500">
                    <Trash2 />
                  </button>
                  <MoreVertical />
                </div>
              </div>
            ))}
          </section>

        </div>
      </div>
    </div>
  )
}
