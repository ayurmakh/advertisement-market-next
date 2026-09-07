'use server'

import { redirect } from 'next/navigation';
import { LoginAction, LoginState } from '../types';
import { dbQuerySelectUser } from '../login-action/db';

const mapError = (): LoginState['fields'] => {
    return {
        form: 'Unexpected error',
    }
};

export const loginAction: LoginAction = async (_previousState, actionPayload): Promise<LoginState> => {
    const credentials = {
        email: (actionPayload.get('email') as string) ?? '',
        password: (actionPayload.get('password') as string) ?? '',
    }

    let userExists = false;

    try {
        userExists = !!await dbQuerySelectUser(credentials);
    } catch (error) {
        console.log(123, error);

        return {
            success: false,
            fields: {
                ...mapError(),
            },
            values: {
                ...credentials,
            },
        };
    }

    if (!userExists) {
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

    redirect('/');
};
