import { pool } from "@/lib/pool";
import { UserDb, UserFetch, UserLogin, UserRegister } from "@/types/user";

const toUser = (userDb: UserDb): UserFetch => ({
    id: userDb.id,
    email: userDb.email,
    firstName: userDb.first_name,
    secondName: userDb.second_name,
});

export const createUserDb = async ({ email, password, first_name, second_name }: UserRegister) => {
    const text = 'INSERT INTO users(email, password, first_name, second_name) VALUES($1, $2, $3, $4) RETURNING id';
    const values = [email, password, first_name, second_name];

    const queryResult = await pool.query<{ id: UserDb['id'] }>(text, values);

    if (!queryResult.rows[0]) {
        throw new Error('User wasn\'t created');
    }

    return queryResult.rows[0].id;
};

export const findUserByIdDb = async (userId: number) => {
    const text = 'SELECT id, email, first_name, second_name FROM users WHERE id = $1';
    const values = [userId];

    const queryResult = await pool.query<UserDb>(text, values);

    return queryResult.rows[0] ? toUser(queryResult.rows[0]) : null;
};

export const findUserByCredentialsDb = async ({ email, password }: UserLogin) => {
    const text = 'SELECT id, email, first_name, second_name FROM users WHERE email = $1 AND password = $2;';
    const values = [email, password];

    const queryResult = await pool.query<UserDb>(text, values);

    return queryResult.rows[0] ? toUser(queryResult.rows[0]) : null;
};
