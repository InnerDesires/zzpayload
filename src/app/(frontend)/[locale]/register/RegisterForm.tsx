'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterForm() {
    const router = useRouter()
    const t = useTranslations('Register')
    const { register, user } = { register: () => {}, user: null }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if (user) {
        router.push("/")
        return null
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setError(t('errors.passwordMismatch'))
            setIsLoading(false)
            return
        }

        try {
            await register(formData.email, formData.password)
            router.push('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : t('errors.generic'))
        } finally {
            setIsLoading(false)
        }
    }

    const handleOAuthSignIn = async (provider: string) => {
        setError(`${provider} registration is not configured yet`)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 space-y-2">
                    <Button
                        onClick={() => handleOAuthSignIn('Google')}
                        className="w-full bg-[#EA4335] text-white hover:bg-[#EA4335]/80"
                        disabled={isLoading}
                    >
                        {t('continueWith', { provider: 'Google' })}
                      
                    </Button>
                    <Button
                        onClick={() => handleOAuthSignIn('Facebook')}
                        className="w-full bg-[#3b5998] text-white hover:bg-[#3b5998]/80"
                        disabled={true}
                    >
                        {t('continueWith', { provider: 'Facebook' })}
                     
                    </Button>
                    <Button
                        onClick={() => handleOAuthSignIn('Instagram')}
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
                            {t('orRegisterWith')}
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-2 text-sm text-red-500 bg-red-50 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            {t('email')}
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            {t('confirmPassword')}
                        </label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full"
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Loading...' : t('submit')}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="w-full text-sm text-center text-gray-500">
                    {t('haveAccount')} <Link href="/login" className="text-blue-500">{t('signIn')}</Link>
                </p>
            </CardFooter>
        </Card>
    )
}

