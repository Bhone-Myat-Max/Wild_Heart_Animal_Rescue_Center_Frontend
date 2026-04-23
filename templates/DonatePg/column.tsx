'use client'
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import {useDonationDialogStore} from "./store"
// import { deleteProduct } from "./actions"

export const columns: ColumnDef<Donation>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "purpose",
        header: "Purpose",
    },
    // {
    //     accessorKey: "image",
    //     header: "Image",
    //     cell: ({ row }) => {
    //         return <Image src={row.original.image} alt="cat_img" width={50} height={50} unoptimized/>
    //     }
    // },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         return <div className={row.original.status == "Active" ? "text-green-400" : "text-gray-800"} >{row.original.status}</div>
    //     }
    // },
    {
        accessorKey: "action",
        header: "Actions",
        cell: ({ row }) => {
            const { setOpen, setDonation } = useDonationDialogStore()
            return <div>
                 {/* <Button onClick={() => { setProduct(row.original); setOpen(true); }}>Edit</Button>
                 <Button onClick={() => deleteProduct(row.original.id!)}>Delete</Button> */}
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      {/* <span className="sr-only">Open menu</span> */}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setDonation(row.original); setOpen(true); }}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
        }
    },
]
