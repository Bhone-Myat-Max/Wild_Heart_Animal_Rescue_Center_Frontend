import { instanceWithAuth as axios } from "@/api"
// import routes from '@/api/products/routes'
export default {
    all: (query : string) => axios.get<HTTPResponse<ProductListResonse>>(routes.resource + query),
    create: ( product : FormData ) => axios.post<HTTPResponse<Product>>(routes.resource, product ),
    update: ( id :number, product: FormData) => axios.post<HTTPResponse<Product>>(routes.resource + "/" + id, product ),
    delete: (id : number) => axios.delete<HTTPResponse<Product>>(routes.resource + "/" + id )
}