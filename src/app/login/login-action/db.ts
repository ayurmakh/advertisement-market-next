import { pool } from '@/lib/db';
import { UserCredentials } from '../types';

export const dbQuerySelectUser = async ({ email, password }: UserCredentials) => {
    const text = 'SELECT * FROM users WHERE email = $1 AND password = $2;';
    const values = [email, password];

    const queryResult = await pool.query<{ id: number }>(text, values);

    console.log(123, queryResult.rows[0])
    return queryResult.rows[0];
};
