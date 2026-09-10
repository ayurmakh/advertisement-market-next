'use server'

import { findSessionByIdDb } from "@/db/sessions";
import { findUserByIdDb } from "@/db/users";
import { COOKIE_NAME } from "@/lib/session";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export default async function getLoggedInUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME)?.value;

    if (!cookie) {
        return null;
    }

    try {
        const session = await findSessionByIdDb(cookie);

        if (!session) {
            return null;
        }

        const user = await findUserByIdDb(session.userId);

        return user ?? null;
    } catch {
        return null;
    }
}
