'use client'

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner"

export default function SignOutBtn() {

    const [loading, setLoading] = useState<boolean>(false)

    
    return (
        <Button className="bg-orange-600" disabled={loading} onClick={ () => signOut()}>{ loading && <Spinner/> }Sign-Out</Button>
    )
}