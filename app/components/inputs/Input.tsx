'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form'

interface InputProps {
    label: string,
    id: string,
    type?: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean
}


const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {

    const [isInputFocused, setIsInputFocused] = useState(false)

    const onFocus = () => {
        setIsInputFocused(true)
    }

    const onFocusOut = () => {
        setIsInputFocused(false)
    }

    return (
        <div>
            <label className={`${isInputFocused ? '-translate-x-2' : ''} block text-sm font-medium leading-6 text-gray-900 transition-transform`}
            htmlFor="{id}">{label}</label>
            <div className="mt-2">
                <input 
                    onFocus={onFocus}                    
                    id={id} 
                    type={type} 
                    autoComplete={id} 
                    {...register(id, { required:required })}
                    onBlur={onFocusOut}
                    className={clsx(`                    
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        pleaceholder:text-gray-400
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-orange-600
                        sm:text-sm
                        sm:leading-6`, 
                        errors[id] && "focus:ring-rose-500",
                        disabled && "opacity-50 cursor-default"
                        )}
                />
            </div>
        </div>
    )
}

export default Input