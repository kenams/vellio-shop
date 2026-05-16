import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de remboursement",
  description: "Politique de remboursement et retours Vellio — 30 jours, sans questions, Stripe 5-10j.",
};

export default function RemboursementPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-black text-brand mb-2">Politique de remboursement</h1>
      <p className="text-gray-400 text-sm mb-8">Dernière mise à jour : janvier 2025</p>

      <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-5 not-prose mb-8">
        <h2 className="text-lg font-black text-green-800 mb-2">Notre engagement</h2>
        <p className="text-green-700 text-sm leading-relaxed">
          Chez Vellio, votre satisfaction est notre priorité absolue. Si vous n'êtes pas entièrement satisfait de votre
          achat pour quelque raison que ce soit, nous vous remboursons intégralement dans un délai de <strong>30 jours</strong>
          suivant la réception de votre commande — sans justification requise.
        </p>
      </div>

      <h2>1. Délai de retour</h2>
      <p>
        Vous disposez de <strong>30 jours calendaires</strong> à compter de la date de réception de votre commande
        pour demander un retour et un remboursement. Ce délai est supérieur au délai légal de 14 jours prévu par
        le Code de la consommation.
      </p>

      <h2>2. Conditions d'éligibilité au remboursement</h2>
      <p>Pour être éligible à un remboursement, le produit doit :</p>
      <ul>
        <li>Être retourné dans un état identique à celui dans lequel il a été reçu ;</li>
        <li>Ne pas avoir été utilisé de manière excessive ;</li>
        <li>Être dans son emballage d'origine ou un emballage similaire permettant de le protéger ;</li>
        <li>Être accompagné de votre numéro de commande.</li>
      </ul>
      <p>
        <strong>Exception :</strong> Nous acceptons également les retours de produits défectueux ou endommagés lors
        de la livraison, sans condition et avec prise en charge des frais de retour.
      </p>

      <h2>3. Produits non remboursables</h2>
      <ul>
        <li>Produits alimentaires ou périssables ;</li>
        <li>Produits d'hygiène intime descellés ;</li>
        <li>Produits confectionnés sur mesure selon les spécifications du Client ;</li>
        <li>Cartes cadeaux numériques.</li>
      </ul>

      <h2>4. Processus de retour</h2>
      <ol>
        <li>
          <strong>Contactez-nous</strong> par email à <a href="mailto:returns@vellio.fr" className="text-primary-600">returns@vellio.fr</a> ou
          via notre <Link href="/contact" className="text-primary-600">formulaire de contact</Link> en indiquant :
          votre numéro de commande, le produit concerné, et la raison du retour (optionnel).
        </li>
        <li>
          <strong>Nous vous confirmons</strong> le retour sous 24h ouvrées avec les instructions d'expédition.
        </li>
        <li>
          <strong>Expédiez le produit</strong> à l'adresse qui vous sera communiquée. Les frais de retour sont à votre charge,
          sauf en cas de produit défectueux ou d'erreur de notre part.
        </li>
        <li>
          <strong>Remboursement</strong> déclenché dès réception et vérification du colis.
        </li>
      </ol>

      <h2>5. Délai de remboursement</h2>
      <p>
        Une fois votre retour reçu et vérifié, le remboursement est traité <strong>sous 2 jours ouvrés</strong>.
        Le crédit apparaît sur votre relevé bancaire <strong>5 à 10 jours ouvrés</strong> après notre traitement,
        selon votre banque et le réseau de paiement.
      </p>
      <p>
        Le remboursement est effectué sur le moyen de paiement original utilisé lors de la commande (carte bancaire via Stripe).
        Si cela s'avère impossible (carte expirée), nous vous contacterons pour convenir d'une alternative.
      </p>

      <h2>6. Échange</h2>
      <p>
        Nous ne proposons pas d'échange direct. Si vous souhaitez un produit différent, effectuez un retour pour remboursement
        puis passez une nouvelle commande.
      </p>

      <h2>7. Produit défectueux ou incorrect</h2>
      <p>
        Si vous recevez un produit défectueux, endommagé ou différent de celui commandé, contactez-nous immédiatement
        avec des photos à <a href="mailto:support@vellio.fr" className="text-primary-600">support@vellio.fr</a>.
        Dans ce cas, nous prenons en charge :
      </p>
      <ul>
        <li>Les frais de retour ;</li>
        <li>Le remplacement du produit ou le remboursement intégral ;</li>
        <li>Un bon de réduction de 10% sur votre prochaine commande en compensation.</li>
      </ul>

      <h2>8. Contact</h2>
      <p>
        Pour toute question relative aux retours et remboursements :<br />
        Email : <a href="mailto:returns@vellio.fr" className="text-primary-600">returns@vellio.fr</a><br />
        Réponse garantie sous 24h ouvrées.
      </p>
    </article>
  );
}
