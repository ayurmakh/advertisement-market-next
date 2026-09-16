import { pool } from '@/lib/pool';
import { GoodCreate, GoodDb, GoodFetch } from '@/types/good';
import { User } from '@/types/user';

const toGoodFetch = (goodDb: GoodDb): GoodFetch => ({
    id: goodDb.id,
    title: goodDb.title,
    description: goodDb.description,
    priceCents: goodDb.price_cents,
});

export const createGoodDb = async ({ userId, title, description, priceCents }: GoodCreate) => {
    const text = 'INSERT INTO goods (user_id, title, description, price_cents) VALUES ($1, $2, $3, $4) RETURNING id;';
    const values = [userId, title, description, priceCents];

    const questyResult = await pool.query<{ id: GoodDb['id'] }>(text, values);

    if (!questyResult.rows[0]) {
        throw new Error('Internal error');
    }

    return questyResult.rows[0].id;
};


export const findGoodsByUserIdDb = async (userId: User['id']) => {
    const text = 'SELECT id, title, description, price_cents FROM goods WHERE user_id = $1';
    const values = [userId];

    const queryResult = await pool.query<GoodDb>(text, values);

    return queryResult.rows.map(toGoodFetch);
};
