import { instanceWithAuth as axios } from "@/api"
import route from '@/api/donations/route'
export default {
    all: (query : string) => axios.get<HTTPResponse<Donation[]>>(route.resource + query),
    detail: ( id :number) => axios.post<HTTPResponse<Donation[]>>(route.resource + "/" + id),
    create: ( donation : FormData ) => axios.post<HTTPResponse<Donation[]>>(route.resource, donation ),
    // update: ( id :number, volunteer: FormData) => axios.post<HTTPResponse<RescueCase[]>>(route.resource + "/" + id + "/status-update", volunteer ),
    // delete: (id : number) => axios.delete<HTTPResponse<Product>>(routes.resource + "/" + id )
}