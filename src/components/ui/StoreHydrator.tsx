"use client";

import { useEffect } from "react";
import { useLangStore } from "@/store/langStore";

export default function StoreHydrator() {
  useEffect(() => {
    void useLangStore.persist.rehydrate();
  }, []);

  return null;
}
