import { instanceWithAuth as axios } from "@/api"
import route from '@/api/rescuecase/route'
export default {
    all: (query : string) => axios.get<HTTPResponse<RescueCase[]>>(route.resource + query),
    detail: ( id :number) => axios.post<HTTPResponse<RescueCase[]>>(route.resource + "/" + id),

    // create: ( product : FormData ) => axios.post<HTTPResponse<Product>>(routes.resource, product ),
    // update: ( id :number, volunteer: FormData) => axios.post<HTTPResponse<RescueCase[]>>(route.resource + "/" + id + "/status-update", volunteer ),
    // delete: (id : number) => axios.delete<HTTPResponse<Product>>(routes.resource + "/" + id )
}