export const paths = {
    index: "/",
    login: "/auth/login",
    register: "/auth/register",

    home: "/home",
    notifications: "/notifications",
    profile: "/profile",
    skirms: "/skirms",
    
    profileEditProfile: "/profile/edit/profile",
    profileEditUsername: "/profile/edit/username",
    profileEditPassword: "/profile/edit/password",
    profileEditPhoto: "/profile/edit/photo",
    
    mySkirms: "home/skirms/my-skirms",
    createSkirm: "/home/skirms/create",
    newSkirm: "/home/skirms/new",

    wallet: "/home/wallet",
    walletTransactionHistory: "/home/wallet/history",
    walletDeposit: "/home/wallet/deposit",
    walletWithdraw: "/home/wallet/withdraw",

    appSettings: "/profile/app-settings",
    profileSettings: "/profile/profile-settings",

    about: "/profile/about",
    aboutFaq: "/profile/about/faq",
    aboutDevelopers: "/profile/about/devs"

} as const