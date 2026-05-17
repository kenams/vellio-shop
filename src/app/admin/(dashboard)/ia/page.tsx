"use client";

import { useState } from "react";
import { Search, Sparkles, Save, Flame, TrendingUp, ShoppingBag, ChevronDown, ChevronUp, Package, RefreshCw, CheckCircle2, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";

interface TrendData {
  score: number;
  popularity: number;
  tiktokTrend: number;
  searchVolume: number;
  margin: number;
  competition: number;
  viralPotential: number;
  safetyRisk: number;
  seasonality: number;
  seoPotential: number;
  reasoning: string;
}

interface SheetData {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  salesArguments: string[];
  marketingAngle: string;
  tiktokScript: string;
  tiktokHashtags: string[];
  metaTitle: string;
  metaDescription: string;
  faq: { q: string; a: string }[];
  seasonality: string;
  price?: number;
  comparePrice?: number;
}

export default function AdminIAPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    supplierPrice: "",
    targetPrice: "",
    keywords: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ sheet: SheetData; trend: TrendData } | null>(null);
  const [showFull, setShowFull] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.category || !form.supplierPrice || !form.targetPrice) {
      toast.error("Remplissez tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai/generate-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          supplierPrice: parseFloat(form.supplierPrice),
          targetPrice: parseFloat(form.targetPrice),
          keywords: form.keywords,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        toast.success("Fiche générée avec succès !");
      } else {
        toast.error(data.error || "Erreur lors de la génération.");
      }
    } catch {
      toast.error("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    setSaving(true);
    try {
      const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "vellio-admin-2024";
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          ...result.sheet,
          price: parseFloat(form.targetPrice),
          cost: parseFloat(form.supplierPrice),
          trendScore: result.trend.score,
          category: form.category,
          published: false,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Produit sauvegardé en base ! ID: " + data.id);
      } else {
        toast.error(data.error || "Erreur lors de la sauvegarde.");
      }
    } catch {
      toast.error("Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const [prospecting, setProspecting] = useState(false);
  const [prospectResult, setProspectResult] = useState<{ added: number; skipped: number; products: string[] } | null>(null);

  async function handleProspect() {
    setProspecting(true);
    setProspectResult(null);
    try {
      const res = await fetch(`/api/cron/discover?secret=${encodeURIComponent("Vellio@Admin2026!")}`, { method: "GET" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setProspectResult(data);
        toast.success(`${data.added} produit(s) ajouté(s) automatiquement !`);
      } else {
        toast.error(data.error || "Erreur lors de la prospection.");
      }
    } catch {
      toast.error("Erreur réseau.");
    } finally {
      setProspecting(false);
    }
  }

  const categories = ["Voyage & Mobilité", "Maison Vellio", "Art de Recevoir", "Beauté Architecturée", "Corps & Rituel", "Maison de Famille", "Jardin design", "Bureau & Création"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand flex items-center gap-2">
          <Search className="w-6 h-6 text-primary-600" /> Veille & Catalogue — Découverte Produits
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Sélection éditoriale basée sur les tendances Google, Amazon et eBay.
        </p>
      </div>

      {/* Bloc prospection automatique */}
      <div className="card p-6 border-2 border-primary-100 bg-gradient-to-br from-primary-50/50 to-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-black text-brand flex items-center gap-2 mb-1">
              <Package className="w-5 h-5 text-primary-600" /> Veille marché & ajout catalogue
            </h2>
            <p className="text-sm text-gray-500 max-w-lg">
              Analyse les tendances publiques (Google, Amazon, eBay), identifie les meilleures ventes et enrichit le catalogue avec fiches complètes, photos et scores de tendance.
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Veille quotidienne : 7h et 17h</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Publié immédiatement</span>
            </div>
          </div>
          <button
            onClick={handleProspect}
            disabled={prospecting}
            className="btn-primary flex items-center gap-2 whitespace-nowrap disabled:opacity-60 flex-shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${prospecting ? "animate-spin" : ""}`} />
            {prospecting ? "Analyse en cours..." : "Lancer maintenant"}
          </button>
        </div>

        {prospectResult && (
          <div className="mt-4 bg-white rounded-xl border border-green-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-bold text-green-700">
                {prospectResult.added} produit(s) ajouté(s) — {prospectResult.skipped} déjà existant(s)
              </span>
            </div>
            {prospectResult.products.length > 0 && (
              <ul className="space-y-1">
                {prospectResult.products.map((name, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire */}
        <div className="card p-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nom du produit <span className="text-brand-accent">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="ex: Lampe LED magnétique portable"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Catégorie <span className="text-brand-accent">*</span>
              </label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field" required>
                <option value="">Choisir une catégorie</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Prix fournisseur (€) <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="number"
                  name="supplierPrice"
                  value={form.supplierPrice}
                  onChange={handleChange}
                  placeholder="8.50"
                  step="0.01"
                  min="0"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Prix de vente (€) <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="number"
                  name="targetPrice"
                  value={form.targetPrice}
                  onChange={handleChange}
                  placeholder="29.99"
                  step="0.01"
                  min="0"
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mots-clés (optionnel)</label>
              <input
                type="text"
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                placeholder="design sobre, cadeau premium, maison contemporaine..."
                className="input-field"
              />
            </div>

            {form.supplierPrice && form.targetPrice && (
              <div className="bg-blue-50 rounded-xl px-4 py-3 text-sm">
                <span className="text-blue-600 font-medium">Marge estimée : </span>
                <span className="font-black text-blue-800">
                  {Math.round(((parseFloat(form.targetPrice) - parseFloat(form.supplierPrice)) / parseFloat(form.targetPrice)) * 100)}%
                </span>
                <span className="text-blue-500 ml-2">
                  (+{formatPrice(parseFloat(form.targetPrice) - parseFloat(form.supplierPrice))} / vente)
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" />
              {loading ? "Génération en cours..." : "Générer la fiche premium"}
            </button>
          </form>
        </div>

        {/* Résultat score */}
        {result && (
          <div className="space-y-4">
            {/* Score global */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-brand flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" /> Score de désirabilité
                </h2>
                <span className={`text-3xl font-black ${result.trend.score >= 80 ? "text-green-500" : result.trend.score >= 60 ? "text-yellow-500" : result.trend.score >= 40 ? "text-orange-500" : "text-red-500"}`}>
                  {result.trend.score}/100
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { key: "popularity", label: "Popularité" },
                  { key: "tiktokTrend", label: "Signal social" },
                  { key: "searchVolume", label: "Volume recherche" },
                  { key: "margin", label: "Marge" },
                  { key: "viralPotential", label: "Potentiel désirabilité" },
                  { key: "seoPotential", label: "Potentiel SEO" },
                ].map(({ key, label }) => {
                  const val = result.trend[key as keyof TrendData] as number;
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-bold">{val}/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getScoreColor(val)}`} style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {result.trend.reasoning && (
                <p className="text-xs text-gray-500 mt-3 italic bg-gray-50 rounded-lg px-3 py-2">
                  {result.trend.reasoning}
                </p>
              )}
            </div>

            {/* Bouton sauvegarder */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? "Sauvegarde..." : "Sauvegarder en base de données"}
            </button>
          </div>
        )}
      </div>

      {/* Fiche complète */}
      {result && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-brand flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary-600" /> Fiche produit générée
            </h2>
            <button
              onClick={() => setShowFull(!showFull)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand transition-colors"
            >
              {showFull ? <><ChevronUp className="w-4 h-4" /> Réduire</> : <><ChevronDown className="w-4 h-4" /> Voir tout</>}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-brand text-lg">{result.sheet.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{result.sheet.shortDescription}</p>
            </div>

            <div className="bg-blue-50 rounded-xl px-4 py-3">
              <p className="text-xs text-blue-600 font-medium mb-1">Angle marketing</p>
              <p className="text-sm text-blue-800">{result.sheet.marketingAngle}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Avantages</p>
              <ul className="space-y-1">
                {result.sheet.benefits?.map((b, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>

            {showFull && (
              <>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Arguments de vente</p>
                  <ul className="space-y-1">
                    {result.sheet.salesArguments?.map((a, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-brand-accent mt-0.5">→</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Note créative</p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                    {result.sheet.tiktokScript}
                  </div>
                  {result.sheet.tiktokHashtags?.length > 0 && (
                    <p className="text-xs text-blue-500 mt-2">
                      {result.sheet.tiktokHashtags.map((h) => `#${h}`).join(" ")}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Meta title</p>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{result.sheet.metaTitle}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Meta description</p>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{result.sheet.metaDescription}</p>
                  </div>
                </div>

                {result.sheet.faq?.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">FAQ générée</p>
                    <div className="space-y-3">
                      {result.sheet.faq.map((item, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
                          <p className="font-semibold text-brand text-sm">Q : {item.q}</p>
                          <p className="text-sm text-gray-600 mt-1">R : {item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Description complète</p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {result.sheet.description}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
