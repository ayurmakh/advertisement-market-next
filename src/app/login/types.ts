export type LoginState = {
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

export type LoginAction = (previousState: LoginState, actionPayload: FormData) => Promise<LoginState>;
