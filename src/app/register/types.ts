import { FormActionState } from "@/types/ui";

type RegisterFields = {
    email?: string;
    password?: string;
    form?: string;
};

type RegisterValues = {
    email?: string;
    password?: string;
};

export type RegisterState = FormActionState<RegisterFields, RegisterValues>;
