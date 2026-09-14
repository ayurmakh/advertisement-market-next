'use server'

import { deleteSessionByIdDb } from "@/db/sessions";
import { COOKIE_NAME } from "@/lib/session";
import { cookies } from "next/headers";

export const logout = async () => {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_NAME)?.value;
    await deleteSessionByIdDb(sessionId!);
    cookieStore.delete(COOKIE_NAME);
};
