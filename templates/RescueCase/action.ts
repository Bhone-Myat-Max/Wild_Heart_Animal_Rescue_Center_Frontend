"use server"

import RescueCaseAPI from '@/api/rescuecase'
import { revalidateByPath } from '@/utils/action'




export const getAll_RescueCase = async (query: string) => {
    try {
        const res = await RescueCaseAPI.all(query)
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}
export const CreateCase = async (data: RescueCasePayload) => {
  try {
    console.log(data);
    const res = await RescueCaseAPI.create(data)
    revalidateByPath("/rescuecase")
    return res.data.data
  } catch (error) {
    console.log(error, 'errr')
    throw error
  }
}
export const HandelComplete = async (id: number) => {
  try {
    console.log(id);
    const res = await RescueCaseAPI.complete(id)
    revalidateByPath("/rescuecase")
    return res.data
  } catch (error) {
    console.log(error, 'errr')
    throw error
  }
}

export const showDetail = async (id: number) => {
    try {
        const res = await RescueCaseAPI.detail(id)
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}