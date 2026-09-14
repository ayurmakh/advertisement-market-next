import { User } from "@/types/user";

type Link = {
    href: string;
    text: string;
    isLastOnLeft?: boolean;
}

export default function useHeader(user: User | null) {
    const isLoggedIn = !!user;

    const links: Link[] = [
        {
            href: '/',
            text: 'Home',
        },
        {
            href: '/goods',
            text: 'Goods',
            isLastOnLeft: true,
        },
        ...(isLoggedIn
            ? []
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
