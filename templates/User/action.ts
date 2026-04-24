"use server"


import UserAPI from '@/api/user'
import { revalidateByPath } from '@/utils/action'




export const getAll_User = async (query: string) => {
    try {
        const res = await UserAPI.all(query)
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}
export const UpdateProfile = async (data: FormData) => { 
    try {
        console.log(data);
        const res = await UserAPI.updateProfile(data)

        // optional: check backend success flag
        if (!res.data.success) {
            throw new Error(res.data.message || "Update failed")
        }

        return res.data.data
    } catch (error: any) {
        console.log(error, 'errr')

        // 🔥 THROW instead of return
        throw new Error(
            error?.response?.data?.message || "Update failed"
        )
    }
}

// 'use server'
// import productAPI from '@/api/products'
// import { revalidateByPath } from '@/utils/actions'

// export const getAllProducts = async (query: string) => {
//     try {
//         const res = await productAPI.all(query)
//         return res.data.data
//     } catch (error) {
//         console.log(error, 'errr')
//         return {
//             total: 0,
//             data: []
//         }
//     }
// }

// export const updateProduct = async (id: number, data: FormData) => {
//     try {
//        await productAPI.update(id , data)
//        revalidateByPath("/products")
//     } catch (error) {
//         console.log(error, "error...")
//     }
// }

export const createUser = async (data: FormData) => {
  try {
    const res = await UserAPI.create(data)

    if (!res.data.success) {
      throw new Error(res.data.message || "Create failed")
    }

    return res.data

  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Create failed"
    )
  }
}

// export const deleteProduct = async (id: number) => {
//     try {
//         await productAPI.delete(id)
//         revalidateByPath("/products")
//     } catch (error) {
//         console.log(error, "error...")
//     }
// }