'use server'

import { findUserByIdDb } from "@/db/users";
import { getUserId } from "@/lib/session";
import { User } from "@/types/user";

export default async function getLoggedInUser(): Promise<User | null> {
    try {
        const userId = await getUserId();

        if (!userId) {
            return null;
        }

        const user = await findUserByIdDb(userId);

        return user ?? null;
    } catch {
        return null;
    }
}
