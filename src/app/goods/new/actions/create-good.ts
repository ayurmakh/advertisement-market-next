'use server'

import { FormAction } from "@/types/ui";
import { NewGoodState } from "../types";
import { getUserId } from "@/lib/session";
import { GoodCreate } from "@/types/good";
import { getFormField } from "@/helpers/getFormField";
import { createGoodDb } from "@/db/goods";
import { getUnexpectedErrorResult } from "@/helpers/getUnexpectedErrorResult";

export const createGood: FormAction<NewGoodState> = async (_previousState, actionPayload) => {
    const userId = await getUserId();

    const goodData: Omit<GoodCreate, 'userId'> = {
        title: getFormField(actionPayload, 'title'),
        description: getFormField(actionPayload, 'description'),
        price: +getFormField(actionPayload, 'price'),
    };

    if (!userId) {
        return getUnexpectedErrorResult(goodData);
    }

    try {
        await createGoodDb({
            userId,
            ...goodData,
        })
    } catch(error) {
        console.log(1234, error)
        return getUnexpectedErrorResult(goodData);
    }

    return {
        success: true,
    };
};
