'use client'

import styles from './login-form.module.css';
import { useActionState } from 'react';
import { LoginAction, LoginState } from '../../types';

const initialState: LoginState = {
    success: false,
};

type LoginFormProps = {
    loginAction: LoginAction,
}

export default function LoginForm({ loginAction }: LoginFormProps) {
    const [state, formAction, isPending] = useActionState(loginAction, initialState);

    return (
        <form className={styles.loginForm} action={formAction}>
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
