import Dashboard from "@/templates/dashboard";
import { getAllDonations } from "@/templates/DonatePg/action";
import { getAll_RescueCase } from "@/templates/RescueCase/action";
import VolunteersTemplate from "@/templates/Volunteers";
import { getAll_PendingVolunteer } from "@/templates/Volunteers/actions";
import { getAll_AcceptedVolunteer } from "@/templates/Volunteers/actions";

export default async function ProductsPage( ) {
   const volunteer = await getAll_AcceptedVolunteer("");
   const donation = await getAllDonations("");
   const rescue_case = await getAll_RescueCase("");

    return <div className="">
        <Dashboard volunteer={volunteer} donation={donation} rescue_case={rescue_case}/>
        
    </div>
}

