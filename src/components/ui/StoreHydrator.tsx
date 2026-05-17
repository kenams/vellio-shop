"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useLangStore } from "@/store/langStore";

export default function StoreHydrator() {
  useEffect(() => {
    void useLangStore.persist.rehydrate();
    void useCartStore.persist.rehydrate();
  }, []);

  return null;
}
