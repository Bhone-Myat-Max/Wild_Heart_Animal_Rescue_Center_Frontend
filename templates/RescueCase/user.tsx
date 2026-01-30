export type UserProp = {
   user : {
     id: number,
    name: string,
    status: string
   }
   selected: boolean
}
export default function UserCom( { user, selected }  : UserProp){
    
    return <div key={user.id} className={`border p-2 mb-2 rounded ${selected ? 'text-red-400' : ''}`}>
            <p>Name: {user.name}</p>
            <p>Name: {user.status}</p>
            
          </div>
}