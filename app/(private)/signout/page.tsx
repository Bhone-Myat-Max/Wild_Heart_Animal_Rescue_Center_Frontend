'use client'

import SignOutBtn from "@/components/sign-out-btn"
import { signOut } from "next-auth/react"
import { useEffect } from "react"

export default function Signout(){
    useEffect(()=> {
        signOut()
    })
    return (
    <div>
        signing out.....
        
    </div>
)
}