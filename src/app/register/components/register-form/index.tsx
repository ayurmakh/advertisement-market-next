'use client';

import { RegisterAction, RegisterState } from '../../types';
import Form from '@/components/form';
import { UI_TYPE } from '@/components/form/ui-type';

const initialState: RegisterState = {
    success: false,
};

type RegisterFormProps = {
    registerAction: RegisterAction,
}

const elements = [
    { uiType: UI_TYPE.input, type: 'text', name: 'email', label: 'Email' },
    { uiType: UI_TYPE.input, type: 'password', name: 'password', label: 'Password' },
];

export default function RegisterForm({ registerAction }: RegisterFormProps) {
    return (
        <Form
            elements={elements}
            submitAction={registerAction}
            initialState={initialState}
        />
    );
}
