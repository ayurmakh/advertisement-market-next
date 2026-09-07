import { cookies } from 'next/headers';
import { generateUUID } from '../uuid';
import *  as db from './db';


export const SESSION_TTL_MS  = 24 * 60 * 60 * 1000;
export const COOKIE_NAME = 'session_id';

export const createSession = async (userId: number) => {
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    const id = generateUUID();

    try {
        await db.createSession({ id, userId, expiresAt });
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