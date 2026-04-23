'use client'

import { Search, Bell, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SignOutBtn from '../sign-out-btn'
import { Spinner } from '../ui/spinner'
import { useSession } from "next-auth/react"



export default function Header() {
//   const router = useRouter()

//   const handleLogout = () => {
//     if (onLogout) onLogout()
//     else {
//       // example redirect after logout
//       router.push('/login')
//     }
//   }
// const { data: session, status } = useSession()

// if (status === "loading") return <p>Loading...</p>
// if (!session?.user) return <p>Not logged in</p>

// console.log(session.user.name)
 const session = useSession()
    if (!session.data?.user){
        return
    }
    const { name, email, image, role } = session.data.user

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm ">
      
      {/* Search Box */}
      <div className="relative w-64">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search everything..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2" />

        {/* User Info */}
        
      </div>
    </header>
  )
}
