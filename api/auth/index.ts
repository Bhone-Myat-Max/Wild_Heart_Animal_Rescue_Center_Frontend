import axios from "@/api"
import routes from "@/api/auth/route"

export default {
    login: (payload: LoginPayload) => axios.post<HTTPResponse<LoginResponse>>(routes.login, payload),
}



