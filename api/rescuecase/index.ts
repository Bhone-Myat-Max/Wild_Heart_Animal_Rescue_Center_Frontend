import { instanceWithAuth as axios } from "@/api"
import route from '@/api/rescuecase/route'
export default {
    all: (query : string = '') => axios.get<HTTPResponse<RescueCase[]>>(route.resource + '?'+ query),
    detail: ( id :number) => axios.post<HTTPResponse<RescueCase[]>>(route.resource + "/" + id),
    // complete: ( id :number) => axios.put(route.resource + "/" + id + "/complete"),
    complete: (id: number) =>axios.put<HTTPResponse<RescueCase>>(`rescuecase/${id}/complete`),
    create: ( data : RescueCasePayload ) => axios.post<HTTPResponse<RescueCasePayload[]>>(route.resource, data ),
    // update: ( id :number, volunteer: FormData) => axios.post<HTTPResponse<RescueCase[]>>(route.resource + "/" + id + "/status-update", volunteer ),
    // delete: (id : number) => axios.delete<HTTPResponse<Product>>(routes.resource + "/" + id )
}