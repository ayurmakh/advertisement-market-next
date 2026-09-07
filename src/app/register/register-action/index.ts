'use server'

import { redirect } from 'next/navigation';
import { RegisterAction, RegisterState } from '@/app/register/types';
import { createUser } from '@/app/register/register-action/db';
import { validate } from '@/app/register/register-action/validation';

const UNIQUE_VIOLATION_CODE = '23505';

type DbError = { code: string };

const mapError = (error: DbError): RegisterState['fields'] => {
    if (error.code === UNIQUE_VIOLATION_CODE) {
        return {
            email: 'Email is already taken',
        }
    }

    return {
        form: 'Unexpected error',
    }
};

export const registerAction: RegisterAction = async (_previousState, actionPayload): Promise<RegisterState> => {
    const credentials = {
        email: (actionPayload.get('email') as string) ?? '',
        password: (actionPayload.get('password') as string) ?? '',
    }

    const validationErrors = validate(credentials);
    
    if (validationErrors) {
        return {
            success: false,
            fields: validationErrors,
            values: {
                ...credentials,
            },
        }
    }

    try {
        await createUser(credentials);
    } catch(error) {
        return {
            success: false,
            fields: {
                ...mapError(error as DbError),
            },
            values: {
                ...credentials,
            },
        };
    }

    redirect('/login');
};
