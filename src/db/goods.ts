import { pool } from '@/lib/pool';
import { Good, GoodCreate, GoodDb, GoodFetch } from '@/types/good';

const toGoodFetch = (goodDb: GoodDb): GoodFetch => ({
    id: goodDb.id,
    title: goodDb.title,
    description: goodDb.description,
    price: goodDb.price,
});

export const createGoodDb = async ({ userId, title, description, price }: GoodCreate) => {
    const text = 'INSERT INTO goods (user_id, title, description, price) VALUES ($1, $2, $3, $4) RETURNING id;';
    const values = [userId, title, description, price];

    const questyResult = await pool.query<{ id: Good['id'] }>(text, values);

    if (!questyResult.rows[0]) {
        throw new Error('Internal error');
    }

    return questyResult.rows[0].id;
};


export const findGoodsByUserIdDb = async (userId: Good['userId']) => {
    const text = 'SELECT * FROM goods WHERE user_id = $1';
    const values = [userId];

    const queryResult = await pool.query<GoodDb>(text, values);

    return queryResult.rows.map(toGoodFetch);
};
