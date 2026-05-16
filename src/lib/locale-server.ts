import { cookies, headers } from "next/headers";
import type { Locale } from "@/lib/i18n";
import { getLocaleFromAcceptLanguage } from "@/lib/i18n";

export function getServerLocale(): Locale {
  const cookieLang = cookies().get("lang")?.value as Locale | undefined;
  if (cookieLang === "fr" || cookieLang === "en") return cookieLang;
  const acceptLang = headers().get("accept-language");
  return getLocaleFromAcceptLanguage(acceptLang);
}
