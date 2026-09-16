import { User } from "./user";

export type Good = {
    id: number;
    userId: User['id'];
    title: string;
    description: string;
    price: number;
};

export type GoodCreate = Omit<Good, 'id' | 'price'> & {
    priceCents: number;
};

export type GoodFetch = Omit<Good, 'userId' | 'price'> & {
    priceCents: number;
};

export type GoodDb = Omit<Good, 'userId' | 'price'> & {
    user_id: number;
    price_cents: number;
};

export type GoodFormValues = Omit<Good, 'id' | 'userId' | 'price'> & {
    price: string;
};
