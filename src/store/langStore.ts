import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/lib/i18n";

interface LangState {
  locale: Locale;
  hasHydrated: boolean;
  setLocale: (locale: Locale) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      locale: "fr",
      hasHydrated: false,
      setLocale: (locale) => {
        set({ locale });
        document.cookie = `lang=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "vellio-lang",
      partialize: (state) => ({ locale: state.locale }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
