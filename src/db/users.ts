import { pool } from "@/lib/pool";
import { User, UserLogin, UserRegister } from "@/types/user";

type UserDb = {
    id: number;
    email: string;
    first_name?: string;
    second_name?: string;
}

const toUser = (userDb: UserDb): User => ({
    id: userDb.id,
    email: userDb.email,
    firstName: userDb.first_name,
    secondName: userDb.second_name,
});

export const createUserDb = async ({ email, password }: UserRegister) => {
    const text = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING id';
    const values = [email, password];

    const queryResult = await pool.query<{ id: User['id'] }>(text, values);

    if (!queryResult.rows[0]) {
        throw new Error('User wasn\'t created');
    }

    return queryResult.rows[0].id;
};

export const findUserByIdDb = async (userId: number) => {
    const text = 'SELECT id, email FROM users WHERE id = $1';
    const values = [userId];

    const queryResult = await pool.query<UserDb>(text, values);

    return queryResult.rows[0] ? toUser(queryResult.rows[0]) : null;
};

export const findUserByCredentialsDb = async ({ email, password }: UserLogin) => {
    const text = 'SELECT id, email FROM users WHERE email = $1 AND password = $2;';
    const values = [email, password];

    const queryResult = await pool.query<User>(text, values);

    return queryResult.rows[0] ? toUser(queryResult.rows[0]) : null;
};
