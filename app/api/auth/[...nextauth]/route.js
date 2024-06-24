import connectDB from '@/utils/connectdb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
export const authOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name :'credentials',
      // menangani sign in
      async authorize(credentials) {
        const {email, password} = credentials
        try {
          const db = await connectDB()
          const coll = db.collection('user')
          const user =  await coll.findOne({email : email})
          if (!user) {
            return null
          }
          const passwordMatch = await bcrypt.compare(password,user.password)
          if (!passwordMatch) {
            return null
          } else {
            return user  
          }
        } catch (error) {
          console.error(error)
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks : {
    async signIn({ user, account}) {
      const data = {
        _id : user.id,
        name : user.name,
        email : user.email,
      }
      try {
        if (account.provider == 'google') {
          await fetch('https://tasklify-omega.vercel.app/api/google', {
            method : 'POST',
            headers : {
                'Content-Type' : 'aplication/json'
            },
            body : JSON.stringify(data)
          }) 
        }
        return user 
      } catch (error) {
        console.error(error)
      }
    }
  },
  pages : {
    signIn : "/",
    newUser : '/signup'
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };