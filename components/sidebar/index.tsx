'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PawPrint } from 'lucide-react';
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
// import { items } from './menu-items';
const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Volunteers", url: "/volunteers", icon: Users },
  { title: "Animal", url: "/", icon: Dog },
  { title: "Rescue Case", url: "/rescuecase", icon: Siren },
  { title: "Adoption", url: "/calendar", icon: HeartHandshake },
  { title: "Treatment", url: "/settings", icon: Stethoscope },
  { title: "Donation", url: "/calendar", icon: HandCoins },
  { title: "Event", url: "/calendar", icon: CalendarDays },
  { title: "User", url: "/calendar", icon: UserCog },

]

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-orange-700 rounded-lg text-white">
          <PawPrint size={24} />
        </div>
        <h1 className="text-xl font-bold">WildHeart</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${isActive ? "bg-gray-100 text-orange-700 font-semibold" : "text-black hover:bg-slate-50"}
              `}
            >
              <item.icon size={18} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
