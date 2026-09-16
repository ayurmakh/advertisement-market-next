import { FormActionState } from "@/types/ui";

export const getUnexpectedErrorResult = <
    TValues extends NonNullable<FormActionState['values']>,
>(
    values: TValues,
): FormActionState<{ form: string }, TValues> => ({
    success: false,
    fields: {
        form: 'Unexpected error',
    },
    values,
});