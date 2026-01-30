


import RescueList from "@/templates/RescueCase";
import { getAll_RescueCase } from "@/templates/RescueCase/action";
import { getAll_User } from "@/templates/User/action";

export default async function ProductsPage( ) {
    const rescueCaseRes  = await getAll_RescueCase("");
    const userRes  = await getAll_User("");

    console.log("PAGE RescueCase:", rescueCaseRes);
    console.log("PAGE RescueCase:", userRes);

    return <div className="">
        <RescueList userRes ={userRes} rescueCaseRes={rescueCaseRes}/>
        
    </div>
}

