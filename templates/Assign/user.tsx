import { Button } from "@/components/ui/button"

export type UserProp = {
   user : {
     id: number,
    name: string,
    status: string
   }
   selected: boolean
   onClick: (id: number) => void
}
export default function UserCom({ user, selected, onClick }: UserProp) {
  return (
    <div className={`border p-2 mb-2 rounded 
      ${selected ? "bg-red-50 text-red-600 font-semibold" : "text-slate-500 hover:bg-slate-50"}
    `}>
      
      <p>{user.name}</p>

      <Button onClick={() => onClick(user.id)}>
        {selected ? "Remove" : "Select"}
      </Button>

    </div>
  );
}
