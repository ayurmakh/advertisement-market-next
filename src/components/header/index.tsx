'use client'

import styles from './header.module.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useHeader from './useHeader';
import { User } from '@/types/user';
import Dropdown from '../user-button';

type HeaderProps = {
    user: User | null;
}

export default function Header({ user }: HeaderProps) {
    const pathname = usePathname() ?? '';
    const isLoggedIn = !!user;
    const { links } = useHeader(isLoggedIn);

    return (
        <nav className={styles.header}>
            {links.map(({ href, text, isLastOnLeft }) => {
                const isCurrent = href === '/'
                    ? pathname === '/'
                    : pathname === href || pathname.startsWith(`${href}/`);

                return (
                    <Link
                        className={`${styles.link} ${isLastOnLeft ? styles.isLastOnLeft : ''}`}
                        key={text}
                        href={href}
                        aria-current={isCurrent && 'page'}
                    >
                        {text}
                    </Link>
                );
            })}
            {isLoggedIn && <Dropdown
                {...user}
            />}
        </nav>
    );
}
