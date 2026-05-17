import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateOrderNumber(): string {
  return `VEL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
}

export function calculateMargin(cost: number, price: number): number {
  return Math.round(((price - cost) / price) * 100);
}

export function getTrendColor(score: number): string {
  if (score >= 85) return "text-brand-accent";
  if (score >= 70) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-brand/50";
}

export function getTrendLabel(score: number): string {
  if (score >= 88) return "Signature";
  if (score >= 76) return "Forte désirabilité";
  if (score >= 60) return "Sélection montante";
  return "Niche raffinée";
}
