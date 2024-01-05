import NextAuth from "next-auth";
import { UserRole } from '@prisma/client'
// import type { User } from 'next-auth';
import 'next-auth/jwt';

declare module "next-auth" {
    interface User {
        username: string,
        role: UserRole
    }
    interface Session {
        user: user & {
            username: string,
            role: UserRole
        }
        token: {
            username: string,
            role: UserRole
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId
        role: UserRole
    }
}