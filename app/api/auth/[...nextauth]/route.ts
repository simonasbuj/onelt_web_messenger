import bcrypt from "bcrypt"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import FacebookProvider from "next-auth/providers/facebook"
import InstagramProvider from "next-auth/providers/instagram"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismadb"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        AppleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID as string,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                // form submit didnt provide credentials?
                if (!credentials?.email || !credentials?.password ) {
                    throw new Error('Invalid Credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                // user with this email doesnt exist? Or user doesnt have a passowrd 
                // (aka user only has socialauth accounts)?
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials')
                }

                // check if pasword is correct
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectPassword) throw new Error('Invalid credentials')

                // If all checks have passed return user
                return user
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
