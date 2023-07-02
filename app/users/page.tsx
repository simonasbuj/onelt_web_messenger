'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import EmptyState from "../components/EmptyState"

const User = () => {
    const router = useRouter()

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="w-3/4 text-center">youre logged in, good job </div>
                <button 
                    className="font-bold mt-4 border-4 border-orange-400 rounded-lg py-2 px-4 hover:bg-orange-400"
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    Logout
                </button>                
            </div>  
              
            <div className="hidden lg:block lg:pl-80 h-full">
                <EmptyState />
            </div>        
        </>
        
    )
}

export default User