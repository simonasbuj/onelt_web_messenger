import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: "/"
    }
})

// protect these routes if not logged in
export const config = {
    matcher: [
        "/users/:path*"
    ]
}