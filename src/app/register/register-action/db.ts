import { pool } from '@/lib/pool';
import { UserCredentials } from '@/app/register/types';

export const createUser = async ({ email, password }: UserCredentials) => {
    const text = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING id';
    const values = [email, password];

    const queryResult = await pool.query<{ id: number }>(text, values);

    if (!queryResult.rows[0]) {
        throw new Error('User wasn\'t created');
    }

    return queryResult.rows[0].id;
};
