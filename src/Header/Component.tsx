import { HeaderClient } from "./Component.client";
import { getGlobal } from "@/utilities/getGlobals";
import React from "react";
import { getLocale } from "next-intl/server";
import { headers as getHeaders } from "next/headers";

import type { Header } from "@/payload-types";
import { getPayload } from "payload";
import config from "@/payload.config";
import { HydrateClientUser } from "@/components/HydrateClientUser";

export async function Header(params: any) {
  const { locale } = await params;
  const headers = await getHeaders();
  const payload = await getPayload({ config });
  const { permissions, user } = await payload.auth({ headers });
  const headerData: Header = await getGlobal(
    "header",
    locale as "en" | "uk",
    1
  );
  return (
    <>
      <HeaderClient data={headerData} {...{ permissions, user }} />
      <HydrateClientUser permissions={permissions} user={user} />
    </>
  );
}
