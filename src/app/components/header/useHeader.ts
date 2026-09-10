import { User } from "@/types/user";
import { logout } from './logout';

type Link = {
    href?: string;
    text: string;
    onClick?: () => Promise<void>;
}

export default function useHeader(user: User | null) {
    const isLoggedIn = !!user;

    const links: Link[] = [
        {
            href: '/',
            text: 'Home',
        },
        ...(isLoggedIn
            ? [{
                text: 'Logout',
                onClick: logout,
            }]
            : [
                {
                    href: '/login',
                    text: 'Login',
                },
                {
                    href: '/register',
                    text: 'Register',
                },
            ]
        ),
    ];

    return {
        links,
    };
}
