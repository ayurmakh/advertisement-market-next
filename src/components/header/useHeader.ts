type Link = {
    href: string;
    text: string;
    isLastOnLeft?: boolean;
}

export default function useHeader(isLoggedIn: boolean) {
    const links: Link[] = [
        {
            href: '/',
            text: 'Home',
            isLastOnLeft: !isLoggedIn,
        },
        ...(isLoggedIn
            ? [
                {
                    href: '/goods',
                    text: 'My Goods',
                    isLastOnLeft: true,
                },
            ]
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
