'use server'

import { redirect } from 'next/navigation';
import { LoginAction, LoginState } from '../types';
import { findUserByCredentials } from './db';
import { createSession } from '@/lib/session';

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
    const credentials = {
        email: (actionPayload.get('email') as string) ?? '',
        password: (actionPayload.get('password') as string) ?? '',
    }

    let userId: number | undefined;

    try {
        userId = await findUserByCredentials(credentials);
    } catch {
        return getUnexpectedErrorResult(credentials);
    }

    if (!userId) {
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
        await createSession(userId);
    } catch {
        return getUnexpectedErrorResult(credentials);
    }

    redirect('/');
};
