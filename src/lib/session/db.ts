import { pool } from '@/lib/pool';
import { SessionData } from './types';

export const createSession = async ({ id, userId, expiresAt }: SessionData) => {
    const text = 'INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3) RETURNING id';
    const values = [id, userId, expiresAt];

    const queryResult = await pool.query(text, values);

    if (!queryResult.rows[0]) {
        throw new Error('Session wasn\'t created');
    }

    return queryResult.rows[0].id;
};
