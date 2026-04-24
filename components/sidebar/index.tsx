'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PawPrint, Settings2 } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  Dog,
  Siren,
  HeartHandshake,
  Stethoscope,
  HandCoins,
  CalendarDays,
  UserCog
} from 'lucide-react';
import SignOutBtn from '../sign-out-btn';
import { useSession } from 'next-auth/react';
// import { items } from './menu-items';
const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Volunteers", url: "/volunteers", icon: Users },
  { title: "Animal", url: "/animal", icon: Dog },
  { title: "Rescue Case", url: "/rescuecase", icon: Siren },
  { title: "Missions", url: "/rescueMission", icon: Siren },
  // { title: "Adoption", url: "/calendar", icon: HeartHandshake },
  // { title: "Treatment", url: "/settings", icon: Stethoscope },
  { title: "Donation", url: "/donationA", icon: HandCoins },
  // { title: "Event", url: "/calendar", icon: CalendarDays },
  { title: "User", url: "/user", icon: UserCog },
  { title: "Setting", url: "/profileSetting", icon: Settings2 },

]

export default function Sidebar() {
  const pathname = usePathname();

  const session = useSession()
  if (!session.data?.user) {
    return
  }
  const { name, email, image, role } = session.data.user

  // return (
  //   <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col  z-10 sticky top-0">
  //     <div className="p-6 flex items-center gap-3">
  //       <div className="p-2 bg-orange-700 rounded-lg text-white">
  //         <PawPrint size={24} />
  //       </div>
  //       <h1 className="text-xl font-bold">WildHeart</h1>
  //     </div>

  //     <nav className="flex-1 px-4 space-y-1">
  //       {items.map((item) => {
  //         const isActive = pathname === item.url;

  //         return (
  //           <Link
  //             key={item.title}
  //             href={item.url}
  //             className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
  //               ${isActive ? "bg-gray-100 text-orange-700 font-semibold" : "text-black hover:bg-slate-50"}
  //             `}
  //           >
  //             <item.icon size={18} />
  //             <span>{item.title}</span>
  //           </Link>
  //         );
  //       })}
  //     </nav>
  //     <div className="flex items-center gap-3">
  //       <div className="text-right hidden sm:block">
  //         <p className="text-sm font-semibold text-slate-800">{name}</p>
  //         <p className="text-xs text-slate-500">{role}</p>
  //       </div>

  //       <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
  //         AU
  //       </div>
  //     </div>

  //     {/* Logout */}
  //     <SignOutBtn />
  //   </aside>
  // );
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">

      {/* LOGO */}
      <div className="p-6 flex items-center gap-3 border-b">
        <div className="p-2 bg-orange-700 rounded-lg text-white">
          <PawPrint size={24} />
        </div>
        <h1 className="text-xl font-bold">WildHeart</h1>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${isActive
                  ? "bg-orange-50 text-orange-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-50"}
            `}
            >
              <item.icon size={18} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* USER CARD */}
      <div className="p-4 border-t bg-slate-50">
        <div className="flex items-center gap-3">

          {/* Avatar */}
          {image ? (
            <img
              src={image}
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              {name?.charAt(0) || "U"}
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {name}
            </p>
            <p className="text-xs text-slate-500 capitalize">
              {role || "user"}
            </p>
          </div>
          <div className="mt-3">
            <SignOutBtn />
          </div>
        </div>

        {/* SIGN OUT */}

      </div>

    </aside>
  );
}
