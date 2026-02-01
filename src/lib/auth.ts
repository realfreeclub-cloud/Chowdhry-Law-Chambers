import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import { Admin } from "@/models";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                await connectDB();
                const admin = await Admin.findOne({ email: credentials.email });

                if (!admin) return null;

                const isMatch = await bcrypt.compare(
                    credentials.password,
                    admin.passwordHash
                );

                if (!isMatch) return null;

                return { id: admin._id.toString(), email: admin.email };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                // session.user.id = token.id; // Corrected: NextAuth default types don't have id on user by default without extending
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
};
