"use client";

import { useState } from "react";
import { Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "Erreur lors de l'envoi. Réessayez.");
      }
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-brand mb-3">Contactez-nous</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Une question sur votre commande, un produit ou un partenariat ? Notre équipe vous répond sous 24h.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Infos contact */}
        <div className="space-y-5">
          <div className="card p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-brand text-sm mb-1">Email</h3>
              <a href="mailto:support@vellio.fr" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                support@vellio.fr
              </a>
            </div>
          </div>
          <div className="card p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold text-brand text-sm mb-1">Horaires</h3>
              <p className="text-sm text-gray-500">Lun–Ven : 9h–18h<br />Réponse sous 24h ouvrées</p>
            </div>
          </div>
          <div className="card p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-bold text-brand text-sm mb-1">Commandes & suivi</h3>
              <p className="text-sm text-gray-500">
                Préférez l'email pour toute demande liée à une commande — nous traitons plus rapidement avec votre numéro de commande.
              </p>
            </div>
          </div>

          <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-2xl p-5">
            <h3 className="font-bold text-brand text-sm mb-2">Questions fréquentes</h3>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>• Délai de livraison : 7–14 jours ouvrés</li>
              <li>• Retours acceptés jusqu'à 30j</li>
              <li>• Remboursement Stripe sous 5–10j</li>
              <li>• Suivi disponible sur la page <a href="/suivi" className="text-primary-600 underline">suivi</a></li>
            </ul>
          </div>
        </div>

        {/* Formulaire */}
        <div className="md:col-span-2">
          {sent ? (
            <div className="card p-10 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-brand mb-2">Message envoyé !</h2>
              <p className="text-gray-500">
                Merci {form.name}, nous vous répondrons sous 24h à{" "}
                <strong className="text-gray-700">{form.email}</strong>.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="btn-secondary mt-6 text-sm"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-6 space-y-4">
              <h2 className="font-black text-brand text-xl mb-2">Envoyer un message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nom <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Jean Dupont"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jean@exemple.fr"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sujet</label>
                <select name="subject" value={form.subject} onChange={handleChange} className="input-field">
                  <option value="">Choisissez un sujet</option>
                  <option value="commande">Ma commande</option>
                  <option value="retour">Retour / Remboursement</option>
                  <option value="produit">Question sur un produit</option>
                  <option value="partenariat">Partenariat / B2B</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message <span className="text-brand-accent">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Décrivez votre demande en détail. Si vous avez un numéro de commande, merci de l'indiquer."
                  className="input-field resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {loading ? "Envoi..." : "Envoyer le message"}
              </button>

              <p className="text-xs text-gray-400">
                En envoyant ce message, vous acceptez notre{" "}
                <a href="/confidentialite" className="underline">politique de confidentialité</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
