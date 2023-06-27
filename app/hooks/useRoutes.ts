import { usePathname } from "next/navigation"
import { useMemo } from "react"

import { HiChat } from "react-icons/hi"
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2"

import { signOut } from "next-auth/react"
import useConversation from "./useConversation"

const useRoutes = () => {
    const pathname = usePathname()
    const { converstationId } = useConversation()

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/converstations' || !!converstationId
        },
        {
            label: 'Users',
            href: '/chats',
            icon: HiUsers,
            active: pathname === '/chats'
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut({ callbackUrl: '/' }),
            icon: HiArrowLeftOnRectangle
        }
    ], [pathname, converstationId])

    return routes
}

export default useRoutes