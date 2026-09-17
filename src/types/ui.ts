type FormFields = Record<string, string>;
type FormValues = Record<string, string | File[]>;

export type FormActionState<
    TFields extends FormFields = FormFields, 
    TValues extends FormValues = FormValues,
> = {
    success: boolean;
    fields?: TFields;
    values?: TValues;
};

export type FormAction<TFormState extends FormActionState = FormActionState> = (
    previousState: TFormState,
    actionPayload: FormData,
) => Promise<TFormState>;
