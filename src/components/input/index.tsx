import { UI_TYPE } from '@/components/form/ui-type';
import styles from './input.module.css';

export type InputProps = {
    type?: string;
    label?: string;
    name: string;
    defaultValue?: string;
    value?: string;
    error?: string;
    additionalClasses?: string[];
};

export type UiElementInput = InputProps & {
    uiType: typeof UI_TYPE.input;
};

export default function Input({
    type,
    label,
    name,
    defaultValue,
    value,
    error,
    additionalClasses,
}: InputProps) {
    return (
        <div className={`${styles.inputWrapper} ${(additionalClasses ?? []).join(' ')}`}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                defaultValue={defaultValue}
            />
            <span className={styles.error}>{error}</span>
        </div>
    );
}
