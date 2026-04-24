'use client'

import { useState, useEffect } from "react"
import { Heart, Menu, X, User } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add a scroll listener to change navbar background from transparent to glass
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/donation", label: "Donate" },
    { href: "/injury_report", label: "Report Injury" },
    { href: "/volunteer-request", label: "Volunteer" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-black/20 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">

          {/* 🔥 BRANDING */}
          <Link href="/home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight leading-none">
                WildHeart
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mt-1">
                Rescue Center
              </p>
            </div>
          </Link>

          {/* 💻 DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 text-sm font-bold hover:text-emerald-400 transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* <div className="flex items-center gap-4 border-l border-white/20 pl-8"> */}
              {/* Profile Icon matching your Dashboard aesthetic */}
              {/* <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-emerald-600 transition-all cursor-pointer">
                becoming Volunteer
              </div>
            </div> */}
          </div>

          {/* 📱 MOBILE TOGGLE */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE DRAWER */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold text-white hover:text-emerald-400"
            >
              {link.label}
            </Link>
          ))}
          <Button className="bg-emerald-600 text-white w-full h-12 rounded-xl font-bold">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  )
}