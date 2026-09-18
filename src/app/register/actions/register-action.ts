'use server'

import { redirect } from 'next/navigation';
import { RegisterState } from '../types';
import { createUserDb } from '@/db/users';
import { validate } from '../lib/validation';
import { UserForm, UserRegister } from '@/types/user';
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

const toRegister = (userForm: UserForm): UserRegister => ({
    email: userForm.email,
    password: userForm.password,
    first_name: userForm.firstName,
    second_name: userForm.secondName,
});

export const registerAction: FormAction<RegisterState> = async (_previousState, actionPayload) => {
    const userForm: UserForm = {
        email: getFormField(actionPayload, 'email'),
        password: getFormField(actionPayload, 'password'),
        firstName: getFormField(actionPayload, 'firstName'),
        secondName: getFormField(actionPayload, 'secondName'),
    }

    const validationErrors = validate(userForm);
    
    if (validationErrors) {
        return {
            success: false,
            fields: validationErrors,
            values: {
                ...userForm,
            },
        }
    }

    const userRegister = toRegister(userForm);

    try {
        await createUserDb(userRegister);
    } catch(error) {
        console.log(`Register error: ${error}`)
        return {
            success: false,
            fields: {
                ...mapError(error as DbError),
            },
            values: {
                ...userForm,
            },
        };
    }

    redirect('/login');
};
