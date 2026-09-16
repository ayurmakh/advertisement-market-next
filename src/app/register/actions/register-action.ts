'use server'

import { redirect } from 'next/navigation';
import { RegisterState } from '../types';
import { createUserDb } from '@/db/users';
import { validate } from '../lib/validation';
import { UserRegister } from '@/types/user';
import { FormAction } from '@/types/ui';
import { getFormField } from '@/helpers/getFormField';

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

export const registerAction: FormAction<RegisterState> = async (_previousState, actionPayload) => {
    const credentials: UserRegister = {
        email: getFormField(actionPayload, 'email'),
        password: getFormField(actionPayload, 'password'),
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
