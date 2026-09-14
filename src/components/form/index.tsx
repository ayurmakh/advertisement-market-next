import { useActionState } from 'react';
import Button from '../button';
import Input, { InputProps, UiElementInput } from '../input';
import styles from './form.module.css';

type UiElement = UiElementInput;

type FormActionState = {
    success: boolean;
    fields?: Record<string, string>;
    values?: Record<string, string>;
};

type SubmitAction = (
    previousState: FormActionState,
    actionPayload: FormData,
) => Promise<FormActionState>;

type FormProps = {
    elements: UiElement[];
    submitAction: SubmitAction;
    initialState: FormActionState;
};

export default function Form({ elements, submitAction, initialState }: FormProps) {
    const [state, formAction, isPending] = useActionState(submitAction, initialState);

    return (
        <form className={styles.form} action={formAction}>
            <div className={styles.formFields}>
                {elements.map((element) => {
                    switch (element.uiType) {
                        case 'input': {
                            const inputProps: InputProps = {
                                ...element,
                                additionalClasses: [...(element.additionalClasses ?? []), styles.gridField],
                                defaultValue: state.values?.[element.name] ?? '',
                                error: isPending ? '' : state.fields?.[element.name],
                            };

                            return <Input key={element.name} {...inputProps} />;
                        }
                    }
                })}
            </div>
            <span className={styles.fieldError}>{!isPending && state.fields?.form}</span>
            <Button
                type="submit"
                value={isPending ? 'Loading...' : 'Submit'}
                additionalClasses={[styles.submitButton]}
            />
        </form>
    );
}
