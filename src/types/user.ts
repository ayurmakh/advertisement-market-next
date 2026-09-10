import { Session } from './session';

export type User = {
    id: number;
    email: string;
    firstName?: string;
    secondName?: string;
};

export type UserRegister = Omit<User, 'id'> & {
    password: string
};

export type UserLogin = Pick<User, 'email'> & {
    password: string;
};

export type UserWithSessionId = User & {
    sessionId: Session['id'];
};
