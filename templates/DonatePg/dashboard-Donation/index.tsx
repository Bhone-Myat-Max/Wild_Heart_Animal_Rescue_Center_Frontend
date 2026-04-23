'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontalIcon } from "lucide-react"

import { HandCoins, TrendingUp, Download, PieChart, DollarSign } from 'lucide-react';
import { getAllDonations } from '../action';
import { DataTable } from "../table"
import { columns } from "../column"
// import DonationDialog from "../dialog"
import { useDonationDialogStore } from "../store"

type DonationProp = {
  donation: Donation[]
}
export default function DashboardTemplate({ donation }: DonationProp) {

  const totalDonation = donation.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const foodFound = donation.filter(d => d.purpose === "Food & Nutrition");
  console.log('FoodFund',foodFound);
  const totalfoodDonation = foodFound.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const MedicalCare = donation.filter(d => d.purpose === "Medical Care");
  console.log('Medical',MedicalCare);
  const totalMedicalCare = MedicalCare.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )

   const { setOpen, setDonation } = useDonationDialogStore()
  // console.log("Donation from index",donation);


  // const totalDonation = donation?.data?.reduce(
  //   (sum, d) => sum + Number(d.amount),
  //   0
  // ) ?? 0
   const openCreateDialog = () => {
        setDonation(null)
        setOpen(true)
    }


  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Financial Donations</h1>
          <p className="text-slate-500">Tracking every contribution that fuels our mission.</p>
        </div>
        <div className="flex gap-3">
          {/* <button className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download size={18} />
            Export Report
          </button>
          <button className="px-6 py-2 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all">
            Record Donation
          </button> */}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-500 p-6 rounded-[32px] text-white shadow-xl shadow-orange-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
            <DollarSign size={80} />
          </div>
          <h3 className="text-orange-100 font-medium text-sm mb-1 uppercase tracking-wider">This Month</h3>
          <p className="text-4xl font-bold mb-4">${totalDonation}</p>
          <div className="flex items-center gap-2 text-xs font-bold bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full">
            <TrendingUp size={14} /> +24% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
              <PieChart size={24} />
            </div>
            <div>

              <h3 className="text-slate-800 font-bold">Food Found</h3>
              <p className="text-xs text-slate-400">42% of total goal reached</p>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full mb-4">
            <div className="h-full bg-indigo-500 rounded-full w-[42%]"></div>
          </div>
          <p className="text-sm font-bold text-slate-700"> {totalfoodDonation}/ $8,000</p>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
              <HandCoins size={24} />
            </div>
            <div>
              <h3 className="text-slate-800 font-bold">Medical Fund</h3>
              <p className="text-xs text-slate-400">88% of total goal reached</p>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full mb-4">
            <div className="h-full bg-green-500 rounded-full w-[88%]"></div>
          </div>
          <p className="text-sm font-bold text-slate-700">{totalMedicalCare} / $12,000</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
        {/* <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-6 font-bold text-slate-800 text-sm uppercase tracking-wider">Donor</th>
              <th className="p-6 font-bold text-slate-800 text-sm uppercase tracking-wider">Amount</th>
              <th className="p-6 font-bold text-slate-800 text-sm uppercase tracking-wider">Purpose</th>
              <th className="p-6 font-bold text-slate-800 text-sm uppercase tracking-wider">Phone</th>
              <th className="p-6 font-bold text-slate-800 text-sm uppercase tracking-wider text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {donation.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">D</div>
                    <div>
                      <p className="font-bold text-slate-800">Donor {d.name}</p>
                      <p className="text-xs text-slate-400">{d.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                   <p className="font-bold text-slate-900">${d.amount}</p>
                </td>
                <td className="p-6 text-sm text-slate-600 font-medium">{d.purpose}</td>
                <td className="p-6 text-sm text-slate-500"> {d.phone}</td>
                <td className="p-6 text-right">
                  <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-all"><Download size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

            <DataTable columns={columns} data={donation}/>
            {/* <DonationDialog/> */}
      </div>
    </div>
  );
}

                