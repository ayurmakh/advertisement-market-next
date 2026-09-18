'use client';

import { RegisterState } from '../../types';
import Form, { UiElement } from '@/components/form';
import { UI_TYPE } from '@/components/form/ui-type';
import { FormAction } from '@/types/ui';

const initialState: RegisterState = {
    success: false,
};

type RegisterFormProps = {
    formAction: FormAction<RegisterState>,
}

const elements: UiElement[] = [
    { uiType: UI_TYPE.input, type: 'text', name: 'email', label: 'Email' },
    { uiType: UI_TYPE.input, type: 'password', name: 'password', label: 'Password' },
    { uiType: UI_TYPE.input, type: 'text', name: 'firstName', label: 'First Name' },
    { uiType: UI_TYPE.input, type: 'text', name: 'secondName', label: 'Second Name' },
];

export default function RegisterForm({ formAction }: RegisterFormProps) {
    return (
        <Form
            elements={elements}
            formAction={formAction}
            initialState={initialState}
        />
    );
}
