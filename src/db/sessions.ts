import { pool } from '@/lib/pool';
import { Session } from '@/types/session';

type SessionDb = {
    id: string;
    user_id: number;
    expires_at: Date;
}

const toSession = (sessionDb: SessionDb): Session => ({
    id: sessionDb.id,
    userId: sessionDb.user_id,
    expiresAt: sessionDb.expires_at,
});

export const createSessionDb = async ({ id, userId, expiresAt }: Session) => {
    const text = 'INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3) RETURNING id';
    const values = [id, userId, expiresAt];

    const queryResult = await pool.query<{ id: Session['id'] }>(text, values);

    if (!queryResult.rows[0]) {
        throw new Error('Internal error');
    }

    return queryResult.rows[0].id;
};

export const findSessionByIdDb = async (id: Session['id']) => {
    const text = 'SELECT * FROM sessions WHERE id = $1';
    const values = [id];

    const queryResult = await pool.query<SessionDb>(text, values);

    return queryResult.rows[0] ? toSession(queryResult.rows[0]) : null;
};

export const deleteSessionByIdDb = async (id: Session['id']) => {
    const text = 'DELETE FROM sessions WHERE id = $1';
    const values = [id];

    await pool.query(text, values);
};
