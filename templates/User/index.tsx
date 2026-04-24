"use client";
import { useState, useMemo } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Mail, Phone, Edit2, Eye, Search, Users, Send } from "lucide-react";
import ViewUserDialog from "./View";
import CreateUserDialog from "./userDialog";
import { Button } from "@/components/ui/button";

// Types remain the same...
type AvailabilityStatus = 'Free' | 'On Mission' | 'Off Duty';
type UserStatus = 'Active' | 'Inactive';
type User = {
    id: number;
    name: string;
    phone: string;
    status: UserStatus;
    address: string;
    email: string;
    availability_status: AvailabilityStatus;
};
type UserProp = { User: User[]; };

export default function UserTemplate({ User }: UserProp) {
    // Inside UserTemplate.tsx
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setIsViewOpen(true);
    };
    const handleCreateUser = () => {
        setIsCreateOpen(true);
    };
    
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<AvailabilityStatus | "All">("All");

    const filteredUsers = useMemo(() => {
        return User.filter((u) => {
            const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === "All" || u.availability_status === filter;
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, filter, User]);

    // 1. Container variants with a very slight stagger
    const containerVars: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03 }
        }
    };

    // 2. Fixed item variants: No scale, just a smooth fade and slide
    const itemVars: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.98, // Very subtle scale down instead of bounce
            transition: { duration: 0.2 }
        }
    };

    return (

        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
            {/* Header & Controls remain the same... */}
            <div className="mb-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">User Directory</h1>
                        <p className="text-slate-500">Manage {User.length} registered members</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all shadow-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {["All", "Free", "On Mission", "Off Duty"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as any)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === status
                                ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                                : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleCreateUser}>+ New Staff</Button>
                </div>
            </div>

            {/* 3. GRID FIX: Added specific layout transition to prevent bouncing */}
            <motion.div
                layout
                transition={{
                    layout: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } // Custom smooth ease
                }}
                variants={containerVars}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredUsers.map((user) => (
                        <motion.div
                            key={user.id}
                            layout
                            variants={itemVars}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            // Changed transition-all to transition-shadow in className 
                            // to avoid "clashing" with Framer Motion animations
                            className="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Card Content ... */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center text-white text-xl font-bold shadow-inner">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.availability_status === 'Free' ? 'bg-green-500' :
                                        user.availability_status === 'On Mission' ? 'bg-amber-500' : 'bg-slate-400'
                                        }`} />
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {user.status}
                                </span>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-orange-600 transition-colors">{user.name}</h2>
                                <p className="text-xs font-medium text-orange-500/80 uppercase tracking-tighter">{user.availability_status}</p>
                            </div>

                            <div className="space-y-2 mb-6 border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-3 text-slate-500 text-sm">
                                    <Mail className="w-4 h-4 text-slate-300" />
                                    <span className="truncate">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 text-sm">
                                    <Phone className="w-4 h-4 text-slate-300" />
                                    <span>{user.phone}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => handleViewUser(user)} className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                                    <Eye className="w-4 h-4" /> View
                                </button>
                                <button className="px-3 bg-slate-50 text-slate-400 py-2.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <div className="text-center py-20">
                    <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400">No users found matching your search.</p>
                </div>
            )}
            <ViewUserDialog
                open={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                user={selectedUser}
            />
            <CreateUserDialog
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />
        </div>
    );
}