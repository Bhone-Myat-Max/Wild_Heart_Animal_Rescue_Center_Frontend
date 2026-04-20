import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AnimalTemplate from "@/templates/Animal";
import { getAllAnimal } from "@/templates/Animal/action";
import { getServerSession } from "next-auth";

export default async function AnimalPage( ) {
    const animal = await getAllAnimal("");
    console.log(animal);

     const session = await getServerSession(authOptions)
     console.log('Session',session?.user.role);

    // if (session && session.user.role != 'admin'){
    //     return <></>
    // }
    // const accepted_volunteers = await getAll_AcceptedVolunteer("");
    return <div className="">
        <AnimalTemplate animal={animal} />
        
    </div>
}