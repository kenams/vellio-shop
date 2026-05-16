import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "CGV de Vellio — droits des consommateurs, livraison, retractation, remboursement, droit applicable.",
};

export default function CGVPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-black text-brand mb-2">Conditions Générales de Vente</h1>
      <p className="text-gray-400 text-sm mb-8">Dernière mise à jour : janvier 2025</p>

      <h2>Article 1 — Objet et champ d'application</h2>
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la société <strong>Vellio SARL</strong>,
        dont le siège social est situé en France (ci-après «&nbsp;le Vendeur&nbsp;»), et toute personne physique ou morale
        souhaitant procéder à un achat via le site internet <strong>vellio.fr</strong> (ci-après «&nbsp;le Client&nbsp;»).
      </p>
      <p>
        Toute commande passée sur le site implique l'acceptation pleine et entière des présentes CGV. Les CGV applicables
        sont celles en vigueur à la date de la commande.
      </p>

      <h2>Article 2 — Produits</h2>
      <p>
        Les produits proposés à la vente sont décrits avec la plus grande exactitude possible (caractéristiques, prix, photographies).
        Toutefois, en cas d'erreur ou d'omission manifeste dans la description, la responsabilité du Vendeur ne saurait être engagée.
      </p>
      <p>
        Les photographies sont fournies à titre illustratif et ne sont pas contractuelles. Les produits sont conformes à la réglementation
        européenne en vigueur.
      </p>

      <h2>Article 3 — Prix</h2>
      <p>
        Les prix sont indiqués en euros (€), toutes taxes comprises (TTC), et hors frais de livraison. La TVA applicable est celle
        en vigueur à la date de la commande. Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant entendu que
        le prix figurant au catalogue le jour de la commande sera le seul applicable.
      </p>
      <p>
        Les frais de livraison sont offerts pour toute commande supérieure ou égale à 50 €. En dessous, un forfait de 4,99 € est
        ajouté.
      </p>

      <h2>Article 4 — Commande</h2>
      <p>La passation d'une commande s'effectue comme suit :</p>
      <ol>
        <li>Sélection du produit et ajout au panier ;</li>
        <li>Validation du panier ;</li>
        <li>Saisie des informations de livraison ;</li>
        <li>Paiement sécurisé via Stripe ;</li>
        <li>Confirmation de commande par email.</li>
      </ol>
      <p>
        Toute commande vaut acceptation des prix et descriptions des produits mis en vente. Le Vendeur se réserve le droit
        d'annuler ou de refuser toute commande d'un Client avec lequel il existerait un litige relatif au paiement d'une commande antérieure.
      </p>

      <h2>Article 5 — Paiement</h2>
      <p>
        Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard, American Express) via la plateforme sécurisée
        <strong> Stripe</strong> (certifiée PCI DSS niveau 1). Les données bancaires ne transitent pas par les serveurs du Vendeur.
      </p>
      <p>
        La commande est validée après confirmation du paiement par Stripe. En cas de refus de la part du centre de paiement,
        la commande sera automatiquement annulée.
      </p>

      <h2>Article 6 — Livraison</h2>
      <p>
        Les produits sont expédiés par voie postale ou transporteur, avec un numéro de suivi communiqué par email.
        Le délai de livraison estimé est de <strong>7 à 14 jours ouvrés</strong> à compter de la confirmation de commande,
        selon la disponibilité du produit chez le fournisseur.
      </p>
      <p>
        Le Vendeur ne peut être tenu responsable des retards dus aux transporteurs, douanes, cas de force majeure ou erreurs
        d'adresse fournie par le Client. En cas de colis endommagé à la livraison, le Client doit formuler des réserves auprès
        du transporteur et contacter le Vendeur dans les 72 heures.
      </p>

      <h2>Article 7 — Droit de rétractation</h2>
      <p>
        Conformément à l'article L.221-18 du Code de la consommation, le Client consommateur dispose d'un délai de
        <strong> 14 jours calendaires</strong> à compter de la réception du produit pour exercer son droit de rétractation,
        sans avoir à justifier de motifs ni à payer de pénalités.
      </p>
      <p>
        Pour exercer ce droit, le Client doit notifier sa décision au Vendeur via l'adresse <strong>support@vellio.fr</strong>,
        en utilisant le formulaire type ci-dessous ou toute autre déclaration dénuée d'ambiguïté.
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm my-4">
        <p className="font-bold mb-2">Formulaire type de rétractation :</p>
        <p>À l'attention de Vellio SARL — support@vellio.fr</p>
        <p>Je notifie par la présente ma rétractation du contrat portant sur la vente du produit suivant :</p>
        <p>[Désignation du produit] — commandé le [date] — reçu le [date]</p>
        <p>Nom du consommateur : [Nom]</p>
        <p>Adresse : [Adresse]</p>
        <p>Date : [Date] — Signature : [Signature]</p>
      </div>
      <p>
        Le Client dispose ensuite de 14 jours pour renvoyer le produit. Les frais de retour sont à la charge du Client.
        Le remboursement intégral (produit + livraison aller) est effectué dans un délai de 14 jours à compter de la
        réception du retour, via le moyen de paiement initial.
      </p>
      <p>
        <strong>Exceptions au droit de rétractation :</strong> produits confectionnés selon les spécifications du Client,
        produits périssables, produits descellés par le Client pour des raisons d'hygiène.
      </p>

      <h2>Article 8 — Garanties légales</h2>
      <p>
        Tous les produits vendus bénéficient de la garantie légale de conformité (articles L.217-4 à L.217-14 du Code de la
        consommation) et de la garantie légale contre les vices cachés (articles 1641 à 1648 du Code civil).
      </p>

      <h2>Article 9 — Responsabilité</h2>
      <p>
        Le Vendeur ne saurait être tenu responsable de l'inexécution du contrat en cas de force majeure, de perturbation ou
        grève des services postaux et moyens de transport, d'inondation ou incendie. Le Vendeur ne saurait être tenu responsable
        de tout dommage immatériel (perte de bénéfices, perte de données) résultant de l'utilisation des produits vendus.
      </p>

      <h2>Article 10 — Protection des données personnelles</h2>
      <p>
        Les données personnelles collectées lors de la commande sont traitées conformément à notre{" "}
        <a href="/confidentialite" className="text-primary-600 underline">Politique de confidentialité</a>.
        Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification
        et de suppression de vos données en contactant support@vellio.fr.
      </p>

      <h2>Article 11 — Propriété intellectuelle</h2>
      <p>
        Tous les éléments du site vellio.fr (textes, images, logo, base de données) sont protégés par le droit de la propriété
        intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation expresse du Vendeur.
      </p>

      <h2>Article 12 — Loi applicable et juridiction compétente</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant tout
        recours judiciaire. À défaut, le litige sera porté devant les tribunaux compétents du ressort de la Cour d'appel de
        <strong> Paris</strong>, sauf disposition légale contraire.
      </p>
      <p>
        Le Client peut également recourir à la médiation conformément à l'article L.612-1 du Code de la consommation.
        Plateforme de résolution des litiges de la Commission européenne :{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
          ec.europa.eu/consumers/odr
        </a>
      </p>
    </article>
  );
}
