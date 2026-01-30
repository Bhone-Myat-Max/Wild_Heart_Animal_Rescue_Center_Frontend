

import RescueCaseAPI from '@/api/rescuecase'




export const getAll_RescueCase = async (query: string) => {
    try {
        const res = await RescueCaseAPI.all(query)
        console.log("SERVICE Pending res.data:", res.data);
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}
export const showDetail = async (id: number) => {
    try {
        const res = await RescueCaseAPI.detail(id)
        console.log("SERVICE Pending res.data:", res.data);
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}