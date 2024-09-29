export { Colors, ThemeColors } from "./Colors";
export { cls } from "./cls";
export { AppTheme } from "./AppTheme";

export const WEBSITE_URL = process.env.EXPO_PUBLIC_WEBSITE_URL ?? "https://skirm-app.vercel.app"
export const PAYSTACK = {
    SECRET: process.env.PAYSTACK_SECRET,
    PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY
}