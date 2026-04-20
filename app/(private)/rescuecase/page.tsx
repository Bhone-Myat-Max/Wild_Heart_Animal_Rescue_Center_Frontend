


import RescueList from "@/templates/RescueCase";
import { getAll_RescueCase } from "@/templates/RescueCase/action";
import { getAll_User } from "@/templates/User/action";

export default async function ProductsPage( ) {
    const rescueCaseRes  = await getAll_RescueCase("");
    const userRes  = await getAll_User("");

    return <div className="bg-gray-50">
        <RescueList  userRes ={userRes} rescueCaseRes={rescueCaseRes}/>
        
    </div>
}

