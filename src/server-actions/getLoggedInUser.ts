'use server'

import { findUserByIdDb } from "@/db/users";
import { getUserId } from "@/lib/session";
import { UserFetch } from "@/types/user";

export default async function getLoggedInUser(): Promise<UserFetch | null> {
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
