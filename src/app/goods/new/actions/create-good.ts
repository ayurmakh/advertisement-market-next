'use server'

import { FormAction } from "@/types/ui";
import { NewGoodState } from "../types";
import { getUserId } from "@/lib/session";
import { GoodCreate, GoodFormValues } from "@/types/good";
import { getFormField } from "@/helpers/getFormField";
import { createGoodDb } from "@/db/goods";
import { getUnexpectedErrorResult } from "@/helpers/getErrorResult";
import { validate } from "../lib/validation";
import { User } from "@/types/user";

const toCreate = (formValues: GoodFormValues, userId: User['id']): GoodCreate => ({
    userId,
    title: formValues.title,
    description: formValues.description,
    priceCents: Math.round(parseFloat(formValues.price) * 100)
});

export const createGood: FormAction<NewGoodState> = async (_previousState, actionPayload) => {
    const userId = await getUserId();

    const goodFormValues: GoodFormValues = {
        title: getFormField(actionPayload, 'title'),
        description: getFormField(actionPayload, 'description'),
        price: getFormField(actionPayload, 'price'),
    }

    const formErrors = validate(goodFormValues);

    if (formErrors) {
        return {
            success: false,
            values: goodFormValues,
            fields: formErrors,
        }
    }

    if (!userId) {
        return getUnexpectedErrorResult(goodFormValues);
    }

    try {
        await createGoodDb(toCreate(goodFormValues, userId))
    } catch {
        return getUnexpectedErrorResult(goodFormValues);
    }

    return {
        success: true,
    };
};
