


import { getAllDonations } from "@/templates/DonatePg/action";
import DashboardTemplate from "@/templates/DonatePg/dashboard-Donation";
import RescueList from "@/templates/RescueCase";
import { getAll_RescueCase } from "@/templates/RescueCase/action";
import { getAll_User } from "@/templates/User/action";

export default async function ProductsPage( ) {
    const donation = await getAllDonations("");
console.log(donation);
    
    return <div className="bg-gray-50">
        {/* <RescueList  userRes ={userRes} rescueCaseRes={rescueCaseRes}/> */}
        <DashboardTemplate  donation={donation}/>
    </div>
}

