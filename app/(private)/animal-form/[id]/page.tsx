import { AnimalDetail} from "@/templates/Animal/action"
import AnimalForm from "@/templates/Animal/animalform"
import { getAll_RescueCase } from "@/templates/RescueCase/action"

export default async function EditAnimal({
  params,
}: {
  params: Promise<{ id: string }>
}){
     const { id } = await params
const animal = await AnimalDetail(Number(id))
// console.log(animal);
const rescueCases = await getAll_RescueCase("") // You need to fetch this here too!

    return <div>
        {/* <AnimalForm animal={animal}/> */}
    </div>
}