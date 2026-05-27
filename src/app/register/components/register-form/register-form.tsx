'use client'

import styles from './register-form.module.css';
import { useActionState } from 'react';
import { RegisterAction, RegisterState } from '@/app/register/types';

const initialState: RegisterState = {
    success: false,
};

type RegisterFormProps = {
    registerAction: RegisterAction,
}

export default function RegisterForm({ registerAction }: RegisterFormProps) {
    const [state, formAction, isPending] = useActionState(registerAction, initialState);

    return (
        <form className={styles.registerForm} action={formAction}>
            <div className={styles.formFields}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    defaultValue={state.values?.email ?? ''}
                />
                <span className={styles.fieldError}>{!isPending && state.fields?.email}</span>
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    defaultValue={state.values?.password ?? ''}
                />
                <span className={styles.fieldError}>{!isPending && state.fields?.password}</span>
            </div>
            <span className={styles.fieldError}>{!isPending && state.fields?.form}</span>
            <button className={styles.submitButton} type="submit">{isPending ? 'Loading...' : 'Submit'}</button>
        </form>
    );
}
