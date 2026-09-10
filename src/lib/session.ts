import { cookies } from 'next/headers';
import { generateUUID } from './uuid';
import { createSessionDb, findSessionByIdDb } from '@/db/sessions';
import { Session } from '@/types/session';

export const SESSION_TTL_MS  = 24 * 60 * 60 * 1000;
export const COOKIE_NAME = 'session_id';

export const createSession = async (userId: Session['userId']) => {
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    const id = generateUUID();

    try {
        await createSessionDb({ id, userId, expiresAt });
    } catch (error) {
        throw error;
    }

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresAt,
    });
};

export const getSession = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME)?.value;

    if (!cookie) {
        return null;
    }

    try {
        const session = await findSessionByIdDb(cookie);

        return session ?? null;
    } catch {
        return null;
    }
};
