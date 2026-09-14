'use client';

import { LoginAction, LoginState } from '../../types';
import Form from '@/components/form';
import { UI_TYPE } from '@/components/form/ui-type';

const initialState: LoginState = {
    success: false,
};

type LoginFormProps = {
    loginAction: LoginAction,
}

const elements = [
    { uiType: UI_TYPE.input, type: 'text', name: 'email', label: 'Email' },
    { uiType: UI_TYPE.input, type: 'password', name: 'password', label: 'Password' },
];

export default function LoginForm({ loginAction }: LoginFormProps) {
    return (
        <Form
            elements={elements}
            submitAction={loginAction}
            initialState={initialState}
        />
    );
}
