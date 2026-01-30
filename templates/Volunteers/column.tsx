// 'use client'
// import { Button } from "@/components/ui/button"
// import { ColumnDef } from "@tanstack/react-table"
// // import Image from "next/image"
// // import { useProductDialogStore } from "./store"
// // import { deleteProduct } from "./actions"

// export const columns: ColumnDef<Product>[] = [
//     {
//         accessorKey: "id",
//         header: "ID",
//     },
//     {
//         accessorKey: "name",
//         header: "Name",
//     },
//     {
//         accessorKey: "description",
//         header: "Description",
//     },
//     {
//         accessorKey: "price",
//         header: "Price",
//     },
//     {
//         accessorKey: "image",
//         header: "Image",
//         cell: ({ row }) => {
//             return <Image src={row.original.image} alt="cat_img" width={50} height={50} unoptimized/>
//         }
//     },
//     {
//         accessorKey: "category_name",
//         header: "Category",
//     },
//     {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ row }) => {
//             return <div className={row.original.status == "Active" ? "text-green-400" : "text-gray-800"} >{row.original.status}</div>
//         }
//     },
//     {
//         accessorKey: "action",
//         header: "Actions",
//         cell: ({ row }) => {
//             const { setOpen, setProduct } = useProductDialogStore()
//             return <div>
//                  <Button onClick={() => { setProduct(row.original); setOpen(true); }}>Edit</Button>
//                  <Button onClick={() => deleteProduct(row.original.id!)}>Delete</Button>
//             </div>
//         }
//     },
// ]
