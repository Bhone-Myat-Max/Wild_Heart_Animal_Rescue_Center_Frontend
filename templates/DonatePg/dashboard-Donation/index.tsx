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
import { HomeIcon, MoreHorizontalIcon, Wallet } from "lucide-react"

import { HandCoins, TrendingUp, Download, PieChart, DollarSign } from 'lucide-react';
import { getAllDonations } from '../action';
import { DataTable } from "../table"
import { columns } from "../column"
// import DonationDialog from "../dialog"
import { useDonationDialogStore } from "../store"
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
type DonationProp = {
  donation: Donation[]
}
export default function DashboardTemplate({ donation }: DonationProp) {

  const totalDonation = donation.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const foodFound = donation.filter(d => d.purpose === "Food & Nutrition");
  console.log('FoodFund', foodFound);
  const totalfoodDonation = foodFound.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const MedicalCare = donation.filter(d => d.purpose === "Medical Care");
  console.log('Medical', MedicalCare);
  const totalMedicalCare = MedicalCare.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const HabitatConstruction = donation.filter(d => d.purpose === "Habitat Construction");
  console.log('Medical', HabitatConstruction);
  const totalHabitatConstruction = HabitatConstruction.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const GeneralFund = donation.filter(d => d.purpose === "General Fund");
  console.log('Medical', GeneralFund);
  const totalGeneralFund = GeneralFund.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const Other = donation.filter(d => d.purpose === "Other");
  console.log('Medical', Other);
  const totalOther = Other.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  )
  const purposeTotals = donation.reduce((acc, d) => {
    const purpose = d.purpose || "Other"
    acc[purpose] = (acc[purpose] || 0) + Number(d.amount)
    return acc
  }, {} as Record<string, number>)

  const getPercentage = (amount: number) => {
    if (totalDonation === 0) return 0
    return Math.round((amount / totalDonation) * 100)
  }

 

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<DonationPurpose | "All">("All");
  const { setOpen, setDonation } = useDonationDialogStore()

  const filteredDonations = useMemo(() => {
    return donation.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.phone.includes(searchTerm);

      const matchesFilter =
        filter === "All" || d.purpose === filter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter, donation]);


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
          {/* <div className="flex items-center gap-2 text-xs font-bold bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full">
            <TrendingUp size={14} /> +24% from last month
          </div> */}
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
              <PieChart size={24} />
            </div>
            <div>

              <h3 className="text-slate-800 font-bold">Food Found</h3>
              <p className="text-xs text-slate-400">{getPercentage(totalfoodDonation)}% of total goal reached</p>
            </div>
          </div>
          {/* <div className="w-full h-2 bg-slate-100 rounded-full mb-4">
            <div className="h-full bg-indigo-500 rounded-full w-[42%]"></div>
          </div> */}
          <p className="text-sm font-bold text-slate-700"> {totalfoodDonation}/ {totalDonation}</p>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
              <HandCoins size={24} />
            </div>
            <div>
              <h3 className="text-slate-800 font-bold">Medical Fund</h3>
              <p className="text-xs text-slate-400">{getPercentage(totalMedicalCare)}% of total goal reached</p>
            </div>
          </div>
          {/* <div className="w-full h-2 bg-slate-100 rounded-full mb-4">
            <div className="h-full bg-green-500 rounded-full w-[88%]"></div>
          </div> */}
          <p className="text-sm font-bold text-slate-700">{totalMedicalCare} / {totalDonation}</p>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
              <PieChart size={24} />
            </div>
            <div>

              <h3 className="text-slate-800 font-bold">Habitat Construction Found</h3>
              <p className="text-xs text-slate-400">{getPercentage(totalHabitatConstruction )}% of total goal reached</p>
            </div>
          </div>
          {/* <div className="w-full h-2 bg-slate-100 rounded-full mb-4">
            <div className="h-full bg-indigo-500 rounded-full w-[42%]"></div>
          </div> */}
          <p className="text-sm font-bold text-slate-700"> {totalHabitatConstruction}/{totalDonation}</p>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-blue-500">
              <HandCoins size={24} />
            </div>
            <div>
              <h3 className="text-slate-800 font-bold">General Fund</h3>
              <p className="text-xs text-slate-400">{getPercentage(totalGeneralFund)}% of total goal reached</p>
            </div>
          </div>
          {/* <div className="w-full h-2 bg-slate-100 rounded-full mb-4">
            <div className="h-full bg-blue-500 rounded-full w-[88%]"></div>
          </div> */}
          <p className="text-sm font-bold text-slate-700">{totalGeneralFund} / {totalDonation}</p>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-orange-500">
              <HandCoins size={24} />
            </div>
            <div>
              <h3 className="text-slate-800 font-bold">Other Fund</h3>
              <p className="text-xs text-slate-400">{getPercentage(totalOther)}% of total goal reached</p>
            </div>
          </div>
          {/* <div className="w-full h-2 bg-slate-100 rounded-full mb-4">
            <div className="h-full bg-orange-500 rounded-full w-[88%]"></div>
          </div> */}
          <p className="text-sm font-bold text-slate-700">{totalOther} / {totalDonation}</p>
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">

          {/* 🧠 Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto">
            {[
              "All",
              "Food & Nutrition",
              "Medical Care",
              "Habitat Construction",
              "General Fund",
              "Other"
            ].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === status
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
          {/* 🔍 Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search donor..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>



        </div>
        <DataTable columns={columns} data={filteredDonations} />
        {/* <DonationDialog/> */}
      </div>
    </div>
  );
}

