import fr from "../../messages/fr.json";
import en from "../../messages/en.json";

export type Locale = "fr" | "en";
export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

const messages: Record<Locale, any> = { fr, en };

export function getT(locale: Locale = "fr") {
  return function t(key: string, vars?: Record<string, string | number>): string {
    const keys = key.split(".");
    let value: any = messages[locale] ?? messages.fr;
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value !== "string") return key;
    if (vars) {
      return Object.entries(vars).reduce(
        (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
        value
      );
    }
    return value;
  };
}

export function getLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const langs = header.split(",").map((l) => l.split(";")[0].trim().toLowerCase());
  for (const lang of langs) {
    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("fr")) return "fr";
  }
  return DEFAULT_LOCALE;
}
