import { pool } from '@/lib/pool';
import { GoodCreate, GoodDb, GoodFetch, GoodImageDb } from '@/types/good';
import { User } from '@/types/user';

const toGoodFetch = (goodDb: GoodDb, imageUrls: GoodFetch['imageUrls']): GoodFetch => ({
    id: goodDb.id,
    title: goodDb.title,
    description: goodDb.description,
    priceCents: goodDb.price_cents,
    imageUrls,
});

export const createGoodDb = async ({ userId, title, description, priceCents, imageUrls }: GoodCreate) => {
    const goodsQueryText = 'INSERT INTO goods (user_id, title, description, price_cents) VALUES ($1, $2, $3, $4) RETURNING id;';
    const goodsQueryValues = [userId, title, description, priceCents];

    const goodsQueryResult = await pool.query<{ id: GoodDb['id'] }>(goodsQueryText, goodsQueryValues);

    if (!goodsQueryResult.rows[0]) {
        throw new Error('Internal error');
    }

    for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];

        const goodsImagesQueryText = 'INSERT INTO goods_images (good_id, url, sort_order) VALUES ($1, $2, $3) RETURNING id;'
        const goodsImagesQueryValues = [goodsQueryResult.rows[0].id, imageUrl, i];

        const goodsImagesQueryResult = await pool.query<{ id: GoodImageDb['id'] }>(goodsImagesQueryText, goodsImagesQueryValues);

        if (!goodsImagesQueryResult.rows[0]) {
            throw new Error('Internal error');
        }
    }

    return goodsQueryResult.rows[0].id;
};


export const findGoodsByUserIdDb = async (userId: User['id']) => {
    const goodsQueryText = 'SELECT id, title, description, price_cents FROM goods WHERE user_id = $1';
    const goodsQueryValues = [userId];

    const goodsQueryResult = await pool.query<GoodDb>(goodsQueryText, goodsQueryValues);

    const goodsFetchResult: GoodFetch[] = [];

    for (const goodRow of goodsQueryResult.rows) {
        const goodsImagesQueryText = 'SELECT id, url, sort_order FROM goods_images WHERE good_id = $1';
        const goodsImagesQueryValues = [goodRow.id];
        
        const goodsImagesQueryResult = await pool.query<GoodImageDb>(goodsImagesQueryText, goodsImagesQueryValues);

        const goodFetch: GoodFetch = toGoodFetch(goodRow, goodsImagesQueryResult.rows.map(({ url }) => url));
        goodsFetchResult.push(goodFetch);
    }

    return goodsFetchResult;
};
