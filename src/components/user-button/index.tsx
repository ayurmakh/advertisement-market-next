import { User } from '@/types/user';
import { logout } from '../header/logout';
import styles from './user-button.module.css';
import { useState } from 'react';

type DropdownProps = {
    email: User['email'];
    firstName: User['firstName'];
    secondName: User['secondName'];
};

export default function UserButton({ email, firstName, secondName }: DropdownProps) {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className={`${styles.wrapper} ${isOpened ? styles.opened : ''}`}>
            <span className={styles.value} onClick={() => setIsOpened(!isOpened)}>{email}</span>
            <div className={styles.options}>
                <div className={styles.option}>{`${firstName} ${secondName}`}</div>
                <div className={`${styles.option} ${styles.logout}`} onClick={logout}>Logout</div>
            </div>
        </div>
    );
}
