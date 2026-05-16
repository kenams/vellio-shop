import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/lib/i18n";

interface LangState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      locale: "fr",
      setLocale: (locale) => {
        set({ locale });
        document.cookie = `lang=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      },
    }),
    { name: "vellio-lang" }
  )
);
