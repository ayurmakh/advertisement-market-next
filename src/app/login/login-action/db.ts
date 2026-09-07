import { pool } from '@/lib/pool';
import { UserCredentials } from '../types';

export const findUserByCredentials = async ({ email, password }: UserCredentials): Promise<number | undefined> => {
    const text = 'SELECT id FROM users WHERE email = $1 AND password = $2;';
    const values = [email, password];

    const queryResult = await pool.query<{ id: number }>(text, values);

    return queryResult.rows[0]?.id;
};
