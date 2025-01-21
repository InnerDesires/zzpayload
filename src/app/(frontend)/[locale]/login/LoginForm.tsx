'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from '@/i18n/routing'
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from 'next-intl';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Login');
    const { login, user } = { login: (user: any, password: any) => {}, user: null}

    useEffect(() => {
        if (user) {
            router.push(`/${locale}`);
        }
    }, [user, router, locale]);

    if (user) {
        return null;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await login(email, password);
            router.push(`/${locale}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    // For now, we'll disable OAuth logins since they need to be configured in Strapi first
    const handleOAuthLogin = async (provider: string) => {
        setError(`${provider} login is not configured yet`);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 space-y-2">
                    <Button
                        onClick={() => handleOAuthLogin('Google')}
                        className="w-full bg-[#EA4335] text-white hover:bg-[#EA4335]/80"
                        disabled={isLoading}
                    >
                        {t('continueWith', { provider: 'Google' })}
                      
                    </Button>
                    <Button
                        onClick={() => handleOAuthLogin('Facebook')}
                        className="w-full bg-[#3b5998] text-white hover:bg-[#3b5998]/80"
                        disabled={true}
                    >
                        {t('continueWith', { provider: 'Facebook' })}
                     
                    </Button>
                    <Button
                        onClick={() => handleOAuthLogin('Instagram')}
                        className="w-full bg-[#C13584] text-white hover:bg-[#833AB4]/80"
                        disabled={true}
                    >
                        {t('continueWith', { provider: 'Instagram' })}
                      
                    </Button>
                </div>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            {t('orContinueWith')}
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-2 text-sm text-red-500 bg-red-50 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            {t('email')}
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            {t('password')}
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full"
                            disabled={isLoading}
                        />
                    </div>
                    <p className="text-sm text-gray-500">
                        {t('forgotPassword')}
                        <Link href={`/reset-password`} className="text-blue-500"> {t('resetPassword')}</Link>
                    </p>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Loading...' : t('submit')}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="w-full text-sm text-center text-gray-500">
                    <Link href={`/register`} className="text-blue-500">{t('registerWithEmail')}</Link>
                </p>
            </CardFooter>
        </Card>
    );
} 