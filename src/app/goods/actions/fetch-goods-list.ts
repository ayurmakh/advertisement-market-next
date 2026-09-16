'use server'

import { findGoodsByUserIdDb } from "@/db/goods";
import { getUserId } from "@/lib/session";
import { GoodFetch } from "@/types/good";

export const fetchGoodsList = async (): Promise<GoodFetch[]> => {
    const userId = await getUserId();

    return findGoodsByUserIdDb(userId!);
};
