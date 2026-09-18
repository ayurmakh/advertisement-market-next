import { Session } from './session';

export type User = {
    id: number;
    email: string;
    firstName: string;
    secondName: string;
};

export type UserForm = Omit<User, 'id'> & {
    password: string;
};

export type UserRegister = Omit<User, 'id' | 'firstName' | 'secondName'> & {
    password: string;
    first_name: string;
    second_name: string;
};

export type UserLogin = Pick<User, 'email'> & {
    password: string;
};

export type UserWithSessionId = User & {
    sessionId: Session['id'];
};

export type UserDb = {
    id: number;
    email: string;
    first_name: string;
    second_name: string;
}

export type UserFetch = User;
