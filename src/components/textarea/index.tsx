import { UI_TYPE } from '@/components/form/ui-type';
import styles from './textarea.module.css';

export type TextareaProps = {
    label?: string;
    name: string;
    defaultValue?: string;
    value?: string;
    error?: string;
    additionalClasses?: string[];
    rows?: number;
    cols?: number;
};

export type UiElementTextarea = Omit<TextareaProps & {
    uiType: typeof UI_TYPE.textarea;
}, 'defaultValue' | 'error'>;

export default function Textarea({
    label,
    name,
    defaultValue,
    value,
    error,
    additionalClasses,
    rows,
    cols,
}: TextareaProps) {
    return (
        <div className={`${styles.textareaWrapper} ${(additionalClasses ?? []).join(' ')}`}>
            <label htmlFor={name}>{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                defaultValue={defaultValue}
                rows={rows}
                cols={cols}
            />
            <span className={styles.error}>{error}</span>
        </div>
    );
}
