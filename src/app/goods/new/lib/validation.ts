import { GoodFormValues } from "@/types/good";
import { NewGoodState } from "../types";
import { FIELD_IS_MANDATORY } from "@/const/validation-error-messages";

export const validate = ({ title, price, description }: GoodFormValues): NewGoodState['fields'] => {
    const fields: NewGoodState['fields'] = {};

    if (!title) {
        fields.title = FIELD_IS_MANDATORY;
    }
    
    if (!description) {
        fields.description = FIELD_IS_MANDATORY;
    }

    const parsedPrice = parseFloat(price);
    
    if (price === '' || Number.isNaN(parsedPrice) || parsedPrice < 0) {
        fields.price = 'Enter a valid price';
    }

    return Object.keys(fields).length ? fields : undefined;
};