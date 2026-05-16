"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("vellio_cookie_consent");
    if (!consent) setTimeout(() => setShow(true), 1500);
  }, []);

  function accept() {
    localStorage.setItem("vellio_cookie_consent", "accepted");
    setShow(false);
  }

  function refuse() {
    localStorage.setItem("vellio_cookie_consent", "refused");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.{" "}
            <Link href="/confidentialite" className="text-primary-600 underline hover:text-primary-700">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={refuse}
            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="text-sm font-medium bg-brand text-white px-5 py-2 rounded-xl hover:bg-brand/90 transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
