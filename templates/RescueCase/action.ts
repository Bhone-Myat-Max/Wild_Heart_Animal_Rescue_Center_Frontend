

import RescueCaseAPI from '@/api/rescuecase'




export const getAll_RescueCase = async (query: string) => {
    try {
        const res = await RescueCaseAPI.all(query)
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
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