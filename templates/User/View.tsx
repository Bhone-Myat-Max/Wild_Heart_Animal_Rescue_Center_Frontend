"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, BadgeCheck, ShieldAlert, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Re-using your types
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

type Props = {
  open: boolean;
  onClose: () => void;
  user: User | null;
};

export default function ViewUserDialog({ open, onClose, user }: Props) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] border-none p-0 overflow-hidden bg-white shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>View Profile: {user.name}</DialogTitle>
        </DialogHeader>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="p-8"
            >
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-2xl shadow-orange-200">
                  {user.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{user.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {user.status === 'Active' ? (
                    <BadgeCheck className="w-4 h-4 text-green-500" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-slate-400" />
                  )}
                  <span className="text-sm font-semibold text-slate-500">{user.status} Member</span>
                </div>
              </div>

              {/* Info Sections */}
              <div className="mt-8 space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Email Address</p>
                      <p className="text-sm font-bold text-slate-700">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Phone Number</p>
                      <p className="text-sm font-bold text-slate-700">{user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Location</p>
                      <p className="text-sm font-bold text-slate-700 line-clamp-1">{user.address}</p>
                    </div>
                  </div>
                </div>

                {/* Status Footer */}
                <div className={`p-4 rounded-2xl flex items-center justify-between ${
                  user.availability_status === 'Free' ? 'bg-green-50 text-green-700' :
                  user.availability_status === 'On Mission' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  <span className="text-sm font-bold">Current Status</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      user.availability_status === 'Free' ? 'bg-green-500' :
                      user.availability_status === 'On Mission' ? 'bg-amber-500' : 'bg-slate-400'
                    }`} />
                    <span className="text-xs font-black uppercase tracking-widest">{user.availability_status}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={onClose}
                className="w-full mt-6 bg-slate-900 text-white py-4 rounded-[1.5rem] font-bold text-sm hover:bg-orange-600 transition-all active:scale-[0.98]"
              >
                Close Profile
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}