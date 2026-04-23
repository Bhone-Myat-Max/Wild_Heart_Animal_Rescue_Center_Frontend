

'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { Assign } from "../Assign/action"
import UserCom from "./user"
import { MapPin, User, Phone, AlertCircle, Check, Circle } from "lucide-react"
type Props = {
  open: boolean
  onClose: () => void
  rescue: RescueCase | null
  users: User[]
}

export default function AssignDialog({ open, onClose, rescue, users }: Props) {
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (rescue) {
      const selected = rescue.users.map(u => u.id)
      setSelectedUserIds(selected)
    }
  }, [rescue])

  const isSelected = (id: number) =>
    selectedUserIds.includes(id)

  // const handleUserClick = (id: number) => {
  //   if (isSelected(id)) {
  //     setSelectedUserIds(prev => prev.filter(uid => uid !== id))
  //   } else {
  //     setSelectedUserIds(prev => [...prev, id])
  //   }
  // }
  const handleUserClick = (id: number) => {
    const user = users.find(u => u.id === id)

    if (user?.availability_status === "On Mission") {
      toast.dismiss()
      toast.error("This staff is busy")
      return
    }

    if (isSelected(id)) {
      setSelectedUserIds(prev => prev.filter(uid => uid !== id))
    } else {
      setSelectedUserIds(prev => [...prev, id])
    }
  }

  const handleSubmit = async () => {
    if (!rescue) return

    if (selectedUserIds.length === 0) {
      toast.dismiss()
      toast.error("Select Rescue Team First")
      return
    }

    setLoading(true)
    await Assign(rescue.id, selectedUserIds)
    toast.success("Rescue Team Sent")
    setLoading(false)
    onClose()
  }



  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl p-0 overflow-hidden bg-white">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {rescue?.case_title}
            </h2>
            <p className="text-sm text-gray-500">
              Assign rescue team
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-5 grid grid-cols-2 gap-4 text-sm">

          <div className="flex items-center gap-2 text-gray-600">
            <AlertCircle size={16} className="text-orange-600" />
            <span className="font-medium">Case No:</span>
          </div>
          <span className="font-semibold text-gray-800">{rescue?.case_number}</span>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-orange-600" />
            <span className="font-medium">Location:</span>
          </div>
          <span className="font-semibold text-gray-800">{rescue?.location}</span>

          <div className="flex items-center gap-2 text-gray-600">
            <User size={16} className="text-orange-600" />
            <span className="font-medium">Reported:</span>
          </div>
          <span className="font-semibold text-gray-800">{rescue?.reported_by}</span>

          <div className="flex items-center gap-2 text-gray-600">
            <AlertCircle size={16} className="text-red-600" />
            <span className="font-medium">Priority:</span>
          </div>
          <span className="font-semibold text-red-600">
            {rescue?.priority_level}
          </span>

        </div>

        {/* USER LIST */}
        <div className="px-5 pb-4 max-h-64 overflow-y-auto space-y-2">

          {users.map(user => {
            const isFree = user.availability_status === "Free"
            const isBusy = user.availability_status === "On Mission"
            const isOffline = user.availability_status === "Off Duty"

            return (
              <div
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className={`cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all
        ${isSelected(user.id)
                    ? "bg-orange-50 border-orange-300"
                    : "bg-white hover:bg-gray-50"}
      `}
              >

                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                    <User size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.name}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone size={12} />
                      {user.phone}
                    </div>

                    {/* ✅ AVAILABILITY */}
                    <div className="flex items-center gap-1 mt-1">
                      <Circle
                        size={10}
                        className={
                          isFree
                            ? "text-green-500 fill-green-500"
                            : isBusy
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400 fill-gray-400"
                        }
                      />
                      <span
                        className={`text-xs font-medium
                ${isFree
                            ? "text-green-600"
                            : isBusy
                              ? "text-red-600"
                              : "text-gray-500"}
              `}
                      >
                        {user.availability_status || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                {isSelected(user.id) ? (
                  <div className="flex items-center gap-1 text-orange-600 font-semibold text-sm">
                    <Check size={16} />
                    Selected
                  </div>
                ) : (
                  <span className="text-xs px-3 py-1 bg-gray-200 rounded-full">
                    Select
                  </span>
                )}

              </div>
            )
          })}

        </div>

        {/* ACTION */}
        <div className="p-5 border-t">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
          >
            {loading && <Spinner className="mr-2 h-4 w-4" />}
            Assign Team
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}