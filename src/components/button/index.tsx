import styles from './button.module.css';

type ButtonProps = {
    value?: string;
    type?: 'submit' | 'reset' | 'button';
    additionalClasses?: string[];
    disabled?: boolean; // TODO
};

export default function Button({ value, type, additionalClasses }: ButtonProps) {
    return (
        <button className={`${styles.button} ${(additionalClasses ?? []).join(' ')}`} type={type}>{value}</button>
    );
}
