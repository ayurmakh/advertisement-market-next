import { FormActionState } from "@/types/ui";

type NewGoodFields = {
    title?: string;
    description?: string;
    price?: string;
    form?: string;
    images?: string;
};

type NewGoodValues = {
    title: string;
    description: string;
    price: string;
    images: File[],
};

export type NewGoodState = FormActionState<NewGoodFields, NewGoodValues>;
