'use client'

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import { useLocale } from 'next-intl';

const locales: Record<string, { label: string; flag: string }> = {
    'en': {
        label: 'English',
        flag: '🇬🇧'
    },
    'uk': {
        label: 'Українська',
        flag: '🇺🇦'
    }
};

export default function LanguageSwitcher() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = useLocale();
    const onSelectChange = useMemo(() => (nextLocale: any) => {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }, [router, pathname, params]);

    return (
        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={clsx(
                                    'hover:border hover:border-primary hover:bg-transparent text-primary',
                                    isPending && 'transition-opacity [&:disabled]:opacity-30'
                                )}
                                disabled={isPending}
                            >
                                <Languages className="h-[1.2rem] w-[1.2rem]" />
                            </Button>
                        </DropdownMenuTrigger>
                    
            <DropdownMenuContent align="end">
                {Object.entries(locales).map(([locale, { label, flag }]) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => onSelectChange(locale)}
                        className={clsx(
                            'cursor-pointer flex items-center gap-2',
                            currentLocale === locale && 'font-bold'
                        )}
                    >
                        <span className="text-base">{flag}</span>
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 