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

    return (
        <div>
            <label 
                className={clsx(
                    `block text-sm leading-6 text-gray-900 transition-transform duration-300`, 
                    isInputFocused ? '-translate-x-2 font-bold' : 'font-medium'
                    )}
                htmlFor="{id}"
            >
                {label}
            </label>
            <div className="mt-2">
                <input 
                    onFocus={() => setIsInputFocused(true)}                    
                    id={id} 
                    type={type} 
                    autoComplete={id} 
                    {...register(id, { required:required })}
                    onBlur={() => setIsInputFocused(false)}
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