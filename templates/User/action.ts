

import UserAPI from '@/api/user'




export const getAll_User = async (query: string) => {
    try {
        const res = await UserAPI.all(query)
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
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

// export const createProduct = async (data: FormData) => {
//     try {
//        await productAPI.create(data)
//        revalidateByPath("/products")
//     } catch (error) {
//         console.log(error, "error...")
//     }
// }

// export const deleteProduct = async (id: number) => {
//     try {
//         await productAPI.delete(id)
//         revalidateByPath("/products")
//     } catch (error) {
//         console.log(error, "error...")
//     }
// }