'use client'

import { signOut } from "next-auth/react"

const Users = () => {
    return (
        <>
            <div className="flex flex-col items-center">
                <div className="w-3/4 text-center">you're logged in, good job</div>
                <button 
                    className="font-bold mt-4 border-4 border-orange-400 rounded-lg py-2 px-4 hover:bg-orange-400"
                    onClick={() => signOut()}                >
                    Logout
                </button>
            </div>            
        </>
        
    )
}

export default Users