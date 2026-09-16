import { FormActionState } from "@/types/ui";

type NewGoodFields = {
    title?: string;
    description?: string;
    price?: string;
    form?: string;
};

type NewGoodValues = {
    title: string;
    description: string;
    price: number;
};

export type NewGoodState = FormActionState<NewGoodFields, NewGoodValues>;
