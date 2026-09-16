'use server'

import { redirect } from 'next/navigation';
import { LoginState } from '../types';
import { findUserByCredentialsDb } from '@/db/users';
import { createSession } from '@/lib/session';
import { User, UserLogin } from '@/types/user';
import { validate } from '../lib/validation';
import { FormAction } from '@/types/ui';
import { getFormField } from '@/helpers/getFormField';
import { getUnexpectedErrorResult } from '@/helpers/getUnexpectedErrorResult';

export const loginAction: FormAction<LoginState> = async (_previousState, actionPayload) => {
    const credentials: UserLogin = {
        email: getFormField(actionPayload, 'email'),
        password: getFormField(actionPayload, 'password'),
    }

    const formErrors = validate(credentials);

    if (formErrors) {
        return {
            success: false,
            values: {
                ...credentials,
            },
            fields: formErrors,
        };
    }

    let user: User | null = null;

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
