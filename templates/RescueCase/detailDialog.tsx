'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, User, AlertCircle, Phone, CheckCircle2, Clock, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import RescueCaseAPI from '@/api/rescuecase'
import toast from "react-hot-toast"
import { useState } from "react"
import { HandelComplete } from "./action"

type Props = {
    open: boolean
    onClose: () => void
    rescue: any | null
}

export default function RescueDetailDialog({ open, onClose, rescue }: Props) {
    //   const [selectedUserIds, setRescueID] = useState<number[]>([])

    const handleCompleteCase = async (id: number) => {
        try {
            const res = await HandelComplete(id)
            if (res.success) {
                toast.success("Rescue case marked as completed")
                onClose()
            } else {
                console.log(res.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong ")
        }
    }

    if (!rescue) return null

    const priorityColors: Record<string, string> = {
        High: "text-red-600 bg-red-50",
        Medium: "text-amber-600 bg-amber-50",
        Low: "text-emerald-600 bg-emerald-50",
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-0 overflow-hidden border-none bg-white shadow-2xl rounded-3xl">

                {/* CLEAN TOP SECTION */}
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            Case {rescue.case_number}
                        </span>
                        <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${priorityColors[rescue.priority_level] || "bg-slate-100 text-slate-600"}`}>
                            {rescue.priority_level} Priority
                        </div>
                    </div>
                    <DialogTitle className="text-2xl font-bold text-slate-800 leading-tight">
                        {rescue.case_title}
                    </DialogTitle>
                </div>

                <div className="px-8 pb-8 space-y-6">

                    {/* STATUS STRIP */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-full shadow-sm text-slate-500">
                                <Clock size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-1">Status</p>
                                <p className="text-sm font-semibold text-slate-700">{rescue.case_status}</p>
                            </div>
                        </div>

                    </div>

                    {/* INFO GROUP */}
                    <div className="grid gap-4">
                        <div className="flex gap-4">
                            <div className="mt-1 text-orange-500"><MapPin size={18} /></div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Rescue Location</p>
                                <p className="text-sm text-slate-600 font-medium">{rescue.location}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1 text-blue-500"><User size={18} /></div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Reported By</p>
                                <p className="text-sm text-slate-600 font-medium">{rescue.reported_by}</p>
                            </div>
                        </div>
                    </div>

                    {/* TEAM SECTION */}
                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield size={14} className="text-slate-400" />
                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Assigned Rescuers</h3>
                        </div>

                        <div className="grid gap-2">
                            <AnimatePresence>
                                {rescue.users?.map((user: any, index: number) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={user.id}
                                        className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 transition-all shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 uppercase">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-700">{user.name}</p>
                                                <p className="text-[11px] text-slate-400 font-medium italic">{user.phone}</p>
                                            </div>
                                        </div>
                                        <a href={`tel:${user.phone}`} className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                                            <Phone size={16} />
                                        </a>

                                       
                                    </motion.div>
                                ))}
                                 {rescue.case_status === "In Progress" && (
                                            // <Button
                                            //     onClick={() => handleCompleteCase(rescue.id)}
                                            //     size="sm"
                                            //     className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs px-4"
                                            // >
                                            //     Resolve Now
                                            // </Button>
                                            <Button

                                                onClick={() => handleCompleteCase(rescue.id)}

                                                className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-95"

                                            >

                                                <CheckCircle2 className="mr-2" size={18} /> Mark Completed

                                            </Button>
                                        )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}