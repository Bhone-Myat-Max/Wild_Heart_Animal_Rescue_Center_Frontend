'use client'
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSession } from "next-auth/react"

export default function SignOut () {
    const session = useSession()
    if (!session.data?.user){
        return
    }
    const { name, email, image } = session.data.user
    return <>
    <Image src={image ? image : ""} alt="profile" width={40} height={40}/>
    <span>{name}</span>
    <span>{email}</span>
    <Button onClick={ () => signOut()}>SignOut</Button>
    </>
}