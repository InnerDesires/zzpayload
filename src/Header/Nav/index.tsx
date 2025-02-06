"use client";

import React, { useCallback } from "react";
import { useTranslations } from "next-intl";

import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { SearchIcon } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/routing";
import { useAuth } from "@/providers/Auth";

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const { user, logout } = useAuth();
  console.log(user);

  const performLogout = useCallback(async () => {
    await logout();
  }, [logout]);
  const t = useTranslations("Nav");
  const navItems = data?.navItems || [];
  return (
    <nav className="flex justify-between flex-1">
      <div className="flex gap-3 items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />;
        })}
      </div>
      <div className="flex gap-3 items-center">
        {!user ? (
          <>
            <Button asChild variant="link" className="sm:block hidden">
              <Link href="/login">{t("login")}</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/register">{t("register")}</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="link">
              <Link href="/profile">{user.email}</Link>
            </Button>
            <Button asChild variant="link" onClick={performLogout}>
              <span>Logout</span>
            </Button>
          </>
        )}
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
