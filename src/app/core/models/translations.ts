import { Lang } from "./lang.type";

export const translations: Record<Lang, Record<string, string>> = {
    en: {
        'auth.welcomeBack': 'Welcome back',
        'auth.loginSubtitle': 'Sign in to your account to continue',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.forgotPassword': 'Forgot password?',
        'auth.login': 'Sign in',
        'auth.noAccount': "Don't have an account?",
        'auth.register': 'Sign up',
        'common.loading': 'Loading…',
    },
    ar: {
        'auth.welcomeBack': 'مرحباً بعودتك',
        'auth.loginSubtitle': 'سجّل دخولك للمتابعة',
        'auth.email': 'البريد الإلكتروني',
        'auth.password': 'كلمة المرور',
        'auth.forgotPassword': 'نسيت كلمة المرور؟',
        'auth.login': 'تسجيل الدخول',
        'auth.noAccount': 'ليس لديك حساب؟',
        'auth.register': 'إنشاء حساب',
        'common.loading': 'جارٍ التحميل…',
    },
};