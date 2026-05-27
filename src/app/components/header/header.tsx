'use client'

import styles from './header.module.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Link = {
    href: string;
    text: string;
}

const links: Link[] = [
    {
        href: '/',
        text: 'Home',
    },
    {
        href: '/register',
        text: 'Register',
    },
    {
        href: '/login',
        text: 'Login',
    },
];

export default function Header() {
    const pathname = usePathname() ?? '';

    return (
        <nav className={styles.header}>
            {links.map(({ href, text }) => {
                const isCurrent = href === '/'
                    ? pathname === '/'
                    : pathname === href || pathname.startsWith(`${href}/`);

                return (
                    <Link
                        className={styles.link}
                        href={href}
                        key={href}
                        aria-current={isCurrent && 'page'}
                    >
                        {text}
                    </Link>
                );
            })}
        </nav>
    );
}
