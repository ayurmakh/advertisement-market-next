'use server'

import { redirect } from 'next/navigation';
import { LoginAction, LoginState } from '../types';
import { findUserByCredentialsDb } from '@/db/users';
import { createSession } from '@/lib/session';
import { User, UserLogin } from '@/types/user';

// const mapError = (): LoginState['fields'] => {
//     return {
//         form: 'Unexpected error',
//     }
// };

const getUnexpectedErrorResult = (values: LoginState['values']) => ({
    success: false,
    fields: {
        form: 'Unexpected error',
    },
    values: {
        ...values,
    },
});

export const loginAction: LoginAction = async (_previousState, actionPayload): Promise<LoginState> => {
    const credentials: UserLogin = {
        email: (actionPayload.get('email') as string) ?? '',
        password: (actionPayload.get('password') as string) ?? '',
    }

    let user: User | undefined;

    try {
        user = await findUserByCredentialsDb(credentials);
    } catch {
        return getUnexpectedErrorResult(credentials);
    }

    if (!user) {
        return {
            success: false,
            fields: {
                form: 'Wrong credentials',
            },
            values: {
                ...credentials,
            },
        };
    }

    try {
        await createSession(user.id);
    } catch {
        return getUnexpectedErrorResult(credentials);
    }

    redirect('/');
};
