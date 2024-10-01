export const paths = {
    index: "/",
    login: "/auth/login",
    register: "/auth/register",

    home: "/home",
    settings: "/home/settings",
    saved: "/home/saved",
    
    singleMovie: (id:string)=>`/movies/${id}`,

    settingsHistory: "/settings/history",

    about: "/profile/about",
    aboutFaq: "/profile/about/faq",
    aboutDevelopers: "/profile/about/devs"

} as const