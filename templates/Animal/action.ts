
"use server"

import AnimalAPI from '@/api/animal'
import { revalidateByPath } from '@/utils/action'


export const getAllAnimal = async (query: string) => {
    try {
        const res = await AnimalAPI.all(query)
        // console.log("SERVICE Pending res.data:", res.data);
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}
export const AnimalDetail = async (id: number) => {
    try {
        const res = await AnimalAPI.detail(id)
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}

export const AddAnimal = async (data: FormData) => {
    try {
       const res = await AnimalAPI.create(data)
       revalidateByPath("/animals")
    // console.log([...data.entries()])

    } catch (error) {
        console.log(error.response, "res error.....")
    }
}

export const updateAnimal = async (id: number, data: FormData) => {
    try {
       await AnimalAPI.update(id , data)
       revalidateByPath("/animals")
    } catch (error) {
        console.log(error, "error...")
    }
}

export const deleteAnimal = async (id: number) => {
    try {
        await AnimalAPI.delete(id)
        revalidateByPath("/animals")
    } catch (error) {
        console.log(error, "error...")
    }
}