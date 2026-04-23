import { instanceWithAuth as axios } from "@/api"
import route from "./route"
// import route from '@/api/rescueMission/index'
export default {
    all: (query : string = '') => axios.get<HTTPResponse<RescueMission[]>>(route.resource + '?' + query),
    // detail: ( id :number) => axios.post<HTTPResponse<RescueCase[]>>(route.resource + "/" + id),

    create: ( data : FormData ) => axios.post<HTTPResponse<RescueMission[]>>(route.resource, data ),
    update: ( id :number, data: FormData) => axios.put<HTTPResponse<RescueMission[]>>(route.resource + "/" + id, data ),
    delete: (id : number) => axios.delete<HTTPResponse<RescueMission>>(route.resource + "/" + id )
}