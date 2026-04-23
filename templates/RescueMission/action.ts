
"use server"

import MissionAPI from '@/api/rescueMission'
import { revalidateByPath } from '@/utils/action'





export const CreateMission = async (data: FormData) => {
    try {
       const res = await MissionAPI.create(data)
       revalidateByPath("/Mission")
    // console.log([...data.entries()])

    } catch (error) {
       console.log(error, "error...")
    }
}

export const UpdateMission = async (id: number, data: FormData) => {
    try {
        console.log("Update",data);
       await MissionAPI.update(id , data)
       revalidateByPath("/Mission")
    } catch (error) {
        console.log(error, "error...")
    }
}

export const deleteAnimal = async (id: number) => {
    try {
        await MissionAPI.delete(id)
        revalidateByPath("/Mission")
    } catch (error) {
        console.log(error, "error...")
    }
}