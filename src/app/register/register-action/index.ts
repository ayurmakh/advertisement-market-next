'use server'

import { redirect } from 'next/navigation';
import { RegisterAction, RegisterState } from '@/app/register/types';
import { createUserDb } from '@/db/users';
import { validate } from '@/app/register/register-action/validation';
import { UserRegister } from '@/types/user';

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
    const credentials: UserRegister = {
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
        await createUserDb(credentials);
    } catch(error) {
        console.log(`Register error: ${error}`)
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
