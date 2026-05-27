export type RegisterState = {
    success: boolean;
    fields?: {
        email?: string;
        password?: string;
        form?: string;
    },
    values?: {
        email?: string;
        password?: string;
    },
}

export type RegisterAction = (previousState: RegisterState, actionPayload: FormData) => Promise<RegisterState>;

export type UserCredentials = {
    email: string;
    password: string;
}
