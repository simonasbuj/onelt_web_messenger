import Sidebar from "../components/sidebar/Sidebar"
import getCurrentUser from "../actions/getCurrentUser"
import getUsers from "../actions/getUsers"
import UserList from "./components/UserList"

export default async function ChatLayout({
    children
}: {
    children: React.ReactNode
}) {
    const users = await getUsers()

    return (
        <Sidebar>
            <div className="h-full">
                <UserList items={users}/>
                { children }
            </div>
        </Sidebar> 
    )
}