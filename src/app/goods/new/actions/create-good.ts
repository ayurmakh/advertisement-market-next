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
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { generateUUID } from "@/helpers/uuid";

const toCreate = (
    formValues: GoodFormValues,
    userId: User['id'],
    imageUrls: GoodCreate['imageUrls'],
): GoodCreate => ({
    userId,
    title: formValues.title,
    description: formValues.description,
    priceCents: Math.round(parseFloat(formValues.price) * 100),
    imageUrls,
});

const writeGoodsImagesIntoUploads = async (files: File[]): Promise<string[]> => {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'goods');
    await mkdir(uploadDir, { recursive: true });
    const imageUrls: string[] = [];

    for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${generateUUID()}.jpg`;
        console.log(123, fileName);
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        imageUrls.push(`/uploads/goods/${fileName}`);
    }

    return imageUrls;
};

export const createGood: FormAction<NewGoodState> = async (_previousState, actionPayload) => {
    const userId = await getUserId();

    const goodFormValues: GoodFormValues = {
        title: getFormField(actionPayload, 'title'),
        description: getFormField(actionPayload, 'description'),
        price: getFormField(actionPayload, 'price'),
        images: actionPayload
            .getAll('images')
            .filter((entry): entry is File => entry instanceof File && entry.size > 0),
    };

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
        const imageUrls = await writeGoodsImagesIntoUploads(goodFormValues.images);
        await createGoodDb(toCreate(goodFormValues, userId, imageUrls))
    } catch {
        return getUnexpectedErrorResult(goodFormValues);
    }

    return {
        success: true,
    };
};
