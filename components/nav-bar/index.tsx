'use client'

import { useState } from "react"
import { Heart, Menu, X } from "lucide-react"
import { Button } from "../ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "/donation", label: "Donate" },
    { href: "/injury_report", label: "Report Injury" },
    { href: "#contact", label: "Contact Us" },
  ]

  return (
    // <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
    //   <div className="max-w-7xl mx-auto px-6">
    //     <div className="flex items-center justify-between h-20">

    //       {/* 🔥 Logo */}
    //       <div className="flex items-center gap-3">
    //         <div className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
    //           <Heart className="w-5 h-5 text-white" />
    //         </div>
    //         <div>
    //           <h1 className="text-xl font-extrabold text-gray-900">
    //             WildHeart
    //           </h1>
    //           <p className="text-xs text-gray-500 -mt-1">
    //             Rescue Center
    //           </p>
    //         </div>
    //       </div>

    //       {/* Desktop */}
    //       <div className="hidden md:flex items-center gap-10">
    //         {navLinks.map((link) => (
    //           <a
    //             key={link.href}
    //             href={link.href}
    //             className="text-gray-700 text-base font-semibold hover:text-emerald-600 transition"
    //           >
    //             {link.label}
    //           </a>
    //         ))}

    //         <Button className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700">
    //           Log Out
    //         </Button>
    //       </div>

    //       {/* Mobile */}
    //       <button
    //         className="md:hidden"
    //         onClick={() => setIsOpen(!isOpen)}
    //       >
    //         {isOpen ? <X /> : <Menu />}
    //       </button>
    //     </div>
    //   </div>
    // </nav>

    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between h-20">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-white">
            WildHeart
          </h1>
          <p className="text-xs text-gray-200 -mt-1">
            Rescue Center
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-white text-base font-semibold hover:text-emerald-300 transition"
          >
            {link.label}
          </a>
        ))}

        {/* <Button className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700">
          Log Out
        </Button> */}
      </div>
    </div>
  </div>
</nav>
  )
}