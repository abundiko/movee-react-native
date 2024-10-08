export const paths = {
    index: "/",
    login: "/auth/login",
    register: "/auth/register",

    home: "/home",
    settings: "/home/settings",
    saved: "/home/saved",
    
    singleMovie: (id:string)=>`/movies/${id}`,
    singleMovieStream: (id:string)=>`/movies/${id}/stream` as any,

    settingsHistory: "/settings/history",

    about: "/settings/about",
    aboutFaq: "/profile/about/faq",
    aboutDevelopers: "/profile/about/devs"

} as const