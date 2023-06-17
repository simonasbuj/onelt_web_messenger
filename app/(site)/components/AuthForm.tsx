'use client'

import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import { Bars, Circles } from "react-loading-icons"
import { Ring } from '@uiball/loaders'

type PageType = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const [pageType, setPageType] = useState<PageType>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    const togglePageType = useCallback(() => {
        pageType === 'LOGIN' ? setPageType('REGISTER') : setPageType('LOGIN')
    }, [pageType])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        console.log("are new sbumits coming?")

        if (pageType === 'REGISTER'){
            // Axios Register
            console.log('REGISTER')
        }

        if (pageType === 'LOGIN'){
            // NextAuth email sign in
            console.log('LOGIN')
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        // NextAuth Social SignIn
    }

    return (
        <div className="mt-8 mx-6 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-10 py-8 pb-10 shadow sm:rounded-lg sm:px-10">
                <form 
                    className="space-y-4" 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {pageType === 'REGISTER' && (
                        <Input id="name" label="Name" register={register} errors={errors}/>
                    )}                    
                    <Input id="email" label="Email" type="email" register={register} errors={errors}/>
                    <Input id="password" label="Password" type="password" register={register} errors={errors}/>

                    <Button
                        disabled={isLoading}
                        fullWidth
                        type='submit'
                    > 
                        {/* This abomination works like this:
                            if isLoading = false 
                                then
                                    if pageType = Loading then 'Sign In' else 'Register
                                else Loading icon
                        */}
                        {!isLoading ? pageType === 'LOGIN' ? 'Sign In' : 'Register' : <Ring color="#ffffff" size={22} lineWeight={6.5}/>}
                    </Button>
                    
                </form>                
            </div>
        </div>
    )
}

export default AuthForm