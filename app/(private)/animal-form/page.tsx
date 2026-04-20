import AnimalForm from "@/templates/Animal/animalform";
import { getAll_RescueCase } from "@/templates/RescueCase/action";

const rescueases = await getAll_RescueCase("")
export default function AnimalFormPage(){
    return (
        <AnimalForm rescueCasesdata={rescueases}/>
    )
}