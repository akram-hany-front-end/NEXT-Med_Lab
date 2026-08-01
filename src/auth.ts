import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                await connectDB();

                if (!credentials) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;
                if (!email || !password) {
                    return null;
                }
                const user = await User.findOne({ email });
                if (!user) {
                    return null;
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return null;
                }
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;

            return session;
        },
    },
});
