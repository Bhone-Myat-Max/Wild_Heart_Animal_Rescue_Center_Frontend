import NextAuth, { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import authAPI from '@/api/auth'
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const result = await authAPI.login({ email: credentials?.email!, password: credentials?.password! })
          const user: User = result.data.data
          if (user) {
            return user
          } else {
            return null
          }
        } catch (error) {
          console.log(error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...user, ...token }
    },
    async session({ session, token }) {
      if (token) {
        session.user = token
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }