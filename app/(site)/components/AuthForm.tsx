'use client'

import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { BsApple, BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs'

import Input from "@/app/components/inputs/Input"
import Button from "@/app/components/Button"
import { Bars, Circles } from "react-loading-icons"
import { Ring } from '@uiball/loaders'
import AuthSocialButton from "./AuthSocialButton"

import { toast } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type PageType = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()
    const router = useRouter()

    const [pageType, setPageType] = useState<PageType>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/chat')
        }
    }, [session?.status, router])

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
            axios.post('/api/register', data)  
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))         
        }

        if (pageType === 'LOGIN'){
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) =>{
                if (callback?.error){
                    toast.error("Invalid Credentials")
                }

                if (callback?.ok && !callback?.error) {
                    //toast.success('Success')
                    // todo: login the user, change the page
                }
            })
            .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
        .then((callback) => {
            if (callback?.error){
                toast.error("Something went wrong")
            }

            if (callback?.ok && !callback?.error) {
                toast.success('Success with Social Login ' + { action })
            }
        })
        .finally(() => setIsLoading(false))
    }

    return (
        <div className="mt-8 mx-6 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-10 py-8 pb-10 shadow sm:rounded-lg sm:px-10">
                <form 
                    className="" 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {pageType === 'REGISTER' && (
                        <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading}/>
                    )}                    
                    <div className="mt-4"></div>
                    <Input id="email" label="Email" type="email" register={register} errors={errors} disabled={isLoading}/>
                    <div className="mt-4"></div>
                    <Input id="password" label="Password" type="password" register={register} errors={errors} disabled={isLoading}/>

                    <div className="mt-6"></div>
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

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"/>                            
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>                    
                    <div className="mt-5 grid grid-cols-2 gap-2">
                        <AuthSocialButton 
                            icon={BsGithub} 
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton 
                            icon={BsGoogle} 
                            onClick={() => socialAction('google')}
                        />
                        <AuthSocialButton 
                            icon={BsApple} 
                            onClick={() => socialAction('apple')}
                        />
                        <AuthSocialButton 
                            icon={BsFacebook} 
                            onClick={() => socialAction('facebook')}
                        />
                    </div>
                    <div className="
                        flex
                        gap-2
                        justify-center
                        text-sm
                        mt-6
                        px-2
                        text-gray-500
                    "
                    >
                        <div>
                            {pageType === 'LOGIN' ? 'New to OneLt?' : 'Already have an account'}
                        </div>
                        <div
                            onClick={togglePageType}
                            className="underline cursor-pointer"
                        >
                            {pageType === 'LOGIN' ? 'Create an Account' : 'Login'}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AuthForm