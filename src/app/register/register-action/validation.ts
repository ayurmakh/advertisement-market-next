import { RegisterState, UserCredentials } from '@/app/register/types';

export const validate = ({ email, password }: UserCredentials): RegisterState['fields'] => {
    const fields: RegisterState['fields'] = {};

    if (!email.includes('@')) {
        fields.email = 'Invalid email address';
    }

    if (password.length < 8) {
        fields.password = 'Password must be at least 8 characters';
    }

    return Object.keys(fields).length > 0 ? fields : undefined;
};
