'use client'

import styles from './header.module.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useHeader from './useHeader';
import { User } from '@/types/user';

type HeaderProps = {
    user: User | null;
}

export default function Header({ user }: HeaderProps) {
    const pathname = usePathname() ?? '';
    const { links } = useHeader(user);

    return (
        <nav className={styles.header}>
            {links.map(({ href, text, onClick }) => {
                const isCurrent = href === '/'
                    ? pathname === '/'
                    : pathname === href || pathname.startsWith(`${href}/`);

                return (
                    href
                        ? <Link
                            className={styles.link}
                            href={href}
                            key={href}
                            aria-current={isCurrent && 'page'}
                        >
                            {text}
                        </Link>
                        : <span
                            className={styles.logoutButton}
                            key={text}
                            onClick={onClick}
                        >{text}</span>
                );
            })}
            {user?.email}
        </nav>
    );
}
