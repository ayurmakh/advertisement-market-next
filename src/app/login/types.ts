import { FormActionState } from "@/types/ui";

type LoginFields = {
    email?: string;
    password?: string;
    form?: string;
};

type LoginValues = {
    email?: string;
    password?: string;
};

export type LoginState = FormActionState<LoginFields, LoginValues>;
