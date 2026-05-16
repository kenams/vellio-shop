import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité RGPD de Vellio — données personnelles, cookies, droits utilisateurs.",
};

export default function ConfidentialitePage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-black text-brand mb-2">Politique de confidentialité</h1>
      <p className="text-gray-400 text-sm mb-8">Dernière mise à jour : janvier 2025 — Conforme RGPD (UE) 2016/679</p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données personnelles est :<br />
        <strong>Vellio SARL</strong><br />
        France<br />
        Email : <a href="mailto:privacy@vellio.fr" className="text-primary-600">privacy@vellio.fr</a>
      </p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons les données suivantes :</p>
      <ul>
        <li>
          <strong>Lors d'une commande :</strong> nom, prénom, adresse email, adresse postale de livraison,
          numéro de téléphone (optionnel), données de paiement (traitées par Stripe — jamais stockées par Vellio).
        </li>
        <li>
          <strong>Lors de l'inscription à la newsletter :</strong> adresse email uniquement.
        </li>
        <li>
          <strong>Lors de la navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de visite
          (via analytics anonymisés Plausible — sans cookies).
        </li>
        <li>
          <strong>Via le formulaire de contact :</strong> nom, email, message.
        </li>
      </ul>

      <h2>3. Finalités du traitement</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-3 border border-gray-200">Finalité</th>
            <th className="text-left p-3 border border-gray-200">Base légale</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Traitement des commandes et livraison", "Exécution du contrat (art. 6.1.b RGPD)"],
            ["Envoi de l'email de confirmation et suivi", "Exécution du contrat"],
            ["Prévention de la fraude", "Intérêt légitime (art. 6.1.f RGPD)"],
            ["Newsletter (avec consentement)", "Consentement (art. 6.1.a RGPD)"],
            ["Statistiques de navigation anonymisées", "Intérêt légitime"],
            ["Réponse aux demandes de contact", "Intérêt légitime"],
          ].map(([f, b]) => (
            <tr key={f}>
              <td className="p-3 border border-gray-200">{f}</td>
              <td className="p-3 border border-gray-200 text-gray-600">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>4. Durée de conservation</h2>
      <ul>
        <li><strong>Données de commande :</strong> 10 ans (obligations comptables et légales)</li>
        <li><strong>Données clients :</strong> 3 ans après le dernier achat ou la dernière interaction</li>
        <li><strong>Newsletter :</strong> jusqu'au désabonnement</li>
        <li><strong>Logs de navigation :</strong> 12 mois maximum</li>
        <li><strong>Formulaire contact :</strong> 1 an</li>
      </ul>

      <h2>5. Destinataires des données</h2>
      <p>Vos données peuvent être partagées avec :</p>
      <ul>
        <li><strong>Stripe</strong> (paiement) — États-Unis, Privacy Shield / SCC — <a href="https://stripe.com/fr/privacy" className="text-primary-600">stripe.com/fr/privacy</a></li>
        <li><strong>Resend</strong> (envoi d'emails transactionnels) — données traitées dans l'UE</li>
        <li><strong>Vercel</strong> (hébergement) — États-Unis, DPA signé, SCC</li>
        <li><strong>Neon / Supabase</strong> (base de données) — selon configuration, UE disponible</li>
        <li>Fournisseurs logistiques (nom + adresse de livraison uniquement)</li>
      </ul>
      <p>Aucune vente ou location de données à des tiers à des fins marketing.</p>

      <h2>6. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d'accès</strong> (art. 15) : obtenir une copie de vos données</li>
        <li><strong>Droit de rectification</strong> (art. 16) : corriger des données inexactes</li>
        <li><strong>Droit à l'effacement</strong> (art. 17) : demander la suppression de vos données</li>
        <li><strong>Droit à la limitation</strong> (art. 18) : restreindre le traitement</li>
        <li><strong>Droit à la portabilité</strong> (art. 20) : recevoir vos données dans un format structuré</li>
        <li><strong>Droit d'opposition</strong> (art. 21) : vous opposer au traitement pour intérêt légitime</li>
        <li><strong>Retrait du consentement</strong> à tout moment (newsletter : lien de désabonnement dans chaque email)</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à <a href="mailto:privacy@vellio.fr" className="text-primary-600">privacy@vellio.fr</a>.
        Nous répondons dans un délai de 30 jours. En cas de réclamation, vous pouvez contacter la{" "}
        <strong>CNIL</strong> : <a href="https://www.cnil.fr" className="text-primary-600" target="_blank" rel="noopener noreferrer">cnil.fr</a>
      </p>

      <h2>7. Cookies</h2>
      <p>Notre site utilise :</p>
      <ul>
        <li>
          <strong>Cookies fonctionnels essentiels</strong> : panier (localStorage), session admin (cookie httpOnly sécurisé).
          Ces cookies sont indispensables au fonctionnement du site — pas de consentement requis.
        </li>
        <li>
          <strong>Analytics Plausible</strong> : analyse de trafic anonymisée, sans cookies, sans données personnelles.
          Conforme RGPD sans bandeau de consentement.
        </li>
      </ul>
      <p>Aucun cookie publicitaire ou de tracking tiers n'est utilisé sur ce site.</p>

      <h2>8. Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :
        connexion HTTPS/TLS, chiffrement des mots de passe (bcrypt), contrôle d'accès, hébergement sécurisé Vercel.
      </p>

      <h2>9. Hébergeur</h2>
      <p>
        <strong>Vercel Inc.</strong><br />
        340 Pine Street, Suite 701 — San Francisco, CA 94104, États-Unis<br />
        DPA disponible sur : <a href="https://vercel.com/legal/dpa" className="text-primary-600" target="_blank" rel="noopener noreferrer">vercel.com/legal/dpa</a>
      </p>

      <h2>10. Modifications</h2>
      <p>
        Nous nous réservons le droit de modifier cette politique à tout moment. La date de dernière mise à jour figure en haut
        du document. Pour les modifications substantielles, nous informerons les abonnés par email.
      </p>
    </article>
  );
}
