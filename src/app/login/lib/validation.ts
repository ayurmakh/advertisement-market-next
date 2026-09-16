import { LoginState } from '../types';
import { UserLogin } from '@/types/user';

export const validate = ({ email, password }: UserLogin): LoginState['fields'] => {
    const fields: LoginState['fields'] = {};

    if (!email.length) {
        fields.email = 'Email shouldn\'t be empty';
    }

    if (!password.length) {
        fields.password = 'Password shouldn\'t be empty';
    }

    return Object.keys(fields).length > 0 ? fields : undefined;
};
