'use client';

import { LoginState } from '../../types';
import Form, { UiElement } from '@/components/form';
import { UI_TYPE } from '@/components/form/ui-type';
import { FormAction } from '@/types/ui';

const initialState: LoginState = {
    success: false,
};

type LoginFormProps = {
    formAction: FormAction<LoginState>,
}

const elements: UiElement[] = [
    { uiType: UI_TYPE.input, type: 'text', name: 'email', label: 'Email' },
    { uiType: UI_TYPE.input, type: 'password', name: 'password', label: 'Password' },
];

export default function LoginForm({ formAction }: LoginFormProps) {
    return (
        <Form
            elements={elements}
            formAction={formAction}
            initialState={initialState}
        />
    );
}
