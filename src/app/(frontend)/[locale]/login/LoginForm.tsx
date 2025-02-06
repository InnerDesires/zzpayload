"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/services/auth/login";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("error_invalid_email"),
  password: z.string().min(8, "error_password_too_short"),
});

export default function Login() {
  const t = useTranslations("Login");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const res = await login(values);
    if (res.errors?.length > 0) {
      form.setError("root", { message: res.errors[0].message });
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <Button className="w-full bg-[#EA4335] text-white hover:bg-[#EA4335]/80">
            {t("continueWith", { provider: "Google" })}
          </Button>
          <Button
            className="w-full bg-[#3b5998] text-white hover:bg-[#3b5998]/80"
            disabled={true}
          >
            {t("continueWith", { provider: "Facebook" })}
          </Button>
          <Button
            className="w-full bg-[#C13584] text-white hover:bg-[#833AB4]/80"
            disabled={true}
          >
            {t("continueWith", { provider: "Instagram" })}
          </Button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("orContinueWith")}
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage t={t} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage t={t} />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
            <p className="text-sm text-gray-500">
              {t("forgotPassword")}
              <Link href={`/reset-password`} className="text-blue-500">
                {t("resetPassword")}
              </Link>
            </p>
            <Button type="submit" className="w-full">
              {t("submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="w-full text-sm text-center text-gray-500">
          <Link href={`/register`} className="text-blue-500">
            {t("registerWithEmail")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
