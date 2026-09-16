import { FIELD_IS_MANDATORY } from '@/const/validation-error-messages';
import { LoginState } from '../types';
import { UserLogin } from '@/types/user';

export const validate = ({ email, password }: UserLogin): LoginState['fields'] => {
    const fields: LoginState['fields'] = {};

    if (!email.length) {
        fields.email = FIELD_IS_MANDATORY;
    }

    if (!password.length) {
        fields.password = FIELD_IS_MANDATORY;
    }

    return Object.keys(fields).length > 0 ? fields : undefined;
};
