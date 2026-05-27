import { pool } from '@/lib/db';
import { UserCredentials } from '@/app/register/types';

export const registerUser = async ({ email, password }: UserCredentials) => {
    const text = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING id';
    const values = [email, password];

    await new Promise(res => setTimeout(res, 2000))

    const queryResult = await pool.query<{ id: number }>(text, values);

    if (!queryResult.rows[0]) {
        throw new Error('Row wasn\'t created');
    }

    return queryResult.rows[0].id;
};
