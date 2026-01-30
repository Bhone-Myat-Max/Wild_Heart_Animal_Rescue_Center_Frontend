
'use client'

import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "../ui/button";



export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/home", label: "Home" },
        { href: "#about", label: "About Us" },
        { href: "/donation", label: "Donate" },
        { href: "#report", label: "Report Injury" },
        { href: "#stories", label: "Contect Us" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-soft">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
                            <Heart className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-display text-xl font-bold text-foreground">
                            WildHeart Rescue
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button variant="default" className="bg-gradient-warm hover:opacity-90 transition-opacity">
                            Get Involved
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
        </nav>
    )



}