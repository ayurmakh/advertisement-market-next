import { useActionState } from 'react';
import Button from '../button';
import Input, { InputProps, UiElementInput } from '../input';
import styles from './form.module.css';
import Textarea, { TextareaProps, UiElementTextarea } from '../textarea';
import { FormAction, FormActionState } from '@/types/ui';

export type UiElement = UiElementInput | UiElementTextarea;

type FormProps<TState extends FormActionState> = {
    elements: UiElement[];
    formAction: FormAction<TState>;
    initialState: Awaited<TState>;
};

export default function Form<TState extends FormActionState>({ elements, formAction, initialState }: FormProps<TState>) {
    const [state, action, isPending] = useActionState<TState, FormData>(formAction, initialState);

    return (
        <form className={styles.form} action={action}>
            <div className={styles.formFields}>
                {elements.map((element) => {
                    switch (element.uiType) {
                        case 'input':
                        case 'inputNumber':
                        case 'file': {
                            const inputProps: InputProps = {
                                ...element,
                                additionalClasses: [...(element.additionalClasses ?? []), styles.gridField],
                                defaultValue: state.values?.[element.name] ?? '',
                                error: isPending ? '' : state.fields?.[element.name],
                            };

                            return <Input key={element.name} {...inputProps} />;
                        }
                        
                        case 'textarea': {
                            const inputProps: TextareaProps = {
                                ...element,
                                additionalClasses: [...(element.additionalClasses ?? []), styles.gridField],
                                defaultValue: state.values?.[element.name] ?? '',
                                error: isPending ? '' : state.fields?.[element.name],
                            };

                            return <Textarea key={element.name} {...inputProps} />;
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
