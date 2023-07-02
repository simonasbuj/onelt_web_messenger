'use client'

import Link from "next/link"
import clsx from "clsx"

interface MobileItemProps {
    icon: any,
    href: string,
    onClick?: () => void,
    active?: boolean
}

const MobileItem: React.FC<MobileItemProps> = ({
    icon: Icon,
    href,
    onClick,
    active
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <Link 
            onClick={onClick}
            href={href}
            className={clsx(`
                group
                flex
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                hover:text-black
                hover:bg-orange-400
                `,
                active ? "bg-orange-400 text-black" : "text-gray-500"
            )}
        >
            <Icon className="h-6 w-6"/>
        </Link>
    )
}

export default MobileItem