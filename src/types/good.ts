export type Good = {
    id: number;
    userId: number;
    title: string;
    description: string;
    price: number;
};

export type GoodCreate = Omit<Good, 'id'>;

export type GoodFetch = Omit<Good, 'userId'>;

export type GoodDb = Omit<Good, 'userId'> & {
    user_id: string;
};
