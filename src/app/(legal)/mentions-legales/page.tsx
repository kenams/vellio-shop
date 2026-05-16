import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Vellio — éditeur, hébergeur, directeur de publication.",
};

export default function MentionsLegalesPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-black text-brand mb-2">Mentions légales</h1>
      <p className="text-gray-400 text-sm mb-8">Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN)</p>

      <h2>1. Éditeur du site</h2>
      <p>
        <strong>Raison sociale :</strong> Vellio SARL<br />
        <strong>Forme juridique :</strong> Société à responsabilité limitée<br />
        <strong>Siège social :</strong> France<br />
        <strong>SIRET :</strong> [à compléter lors de l'immatriculation]<br />
        <strong>TVA intracommunautaire :</strong> FR[XX] XXXXXXXXX<br />
        <strong>Capital social :</strong> [à compléter]<br />
        <strong>Email :</strong> <a href="mailto:contact@vellio.fr" className="text-primary-600">contact@vellio.fr</a>
      </p>

      <h2>2. Directeur de la publication</h2>
      <p>
        Le directeur de la publication est le gérant de Vellio SARL.<br />
        Contact : <a href="mailto:contact@vellio.fr" className="text-primary-600">contact@vellio.fr</a>
      </p>

      <h2>3. Hébergeur</h2>
      <p>
        <strong>Vercel Inc.</strong><br />
        340 Pine Street, Suite 701<br />
        San Francisco, CA 94104<br />
        États-Unis<br />
        Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary-600">vercel.com</a>
      </p>

      <h2>4. Conception et développement</h2>
      <p>
        Site développé avec <strong>Next.js 14</strong> (React), hébergé sur Vercel.<br />
        Base de données : PostgreSQL via Neon/Supabase.<br />
        Paiements : Stripe.<br />
        Emails transactionnels : Resend.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site (textes, images, logo, design, structure) est la propriété exclusive de Vellio SARL
        ou fait l'objet d'une autorisation d'utilisation. Toute reproduction totale ou partielle de ce contenu, par quelque
        procédé que ce soit, sans autorisation expresse et préalable de Vellio SARL, est interdite et constituerait une
        contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
      </p>
      <p>
        Les images de produits peuvent être soumises aux droits des fournisseurs respectifs. Les images illustratives
        proviennent de sources libres de droits (Unsplash).
      </p>

      <h2>6. Liens hypertextes</h2>
      <p>
        Le site vellio.fr peut contenir des liens vers des sites tiers. Vellio SARL n'est pas responsable du contenu
        de ces sites et ne peut être tenue pour responsable des dommages pouvant résulter de leur consultation.
      </p>

      <h2>7. Responsabilité</h2>
      <p>
        Vellio SARL s'efforce d'assurer l'exactitude et la mise à jour des informations publiées sur le site mais ne
        peut garantir leur exactitude, précision ou exhaustivité. Vellio SARL décline toute responsabilité pour toute
        imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.
      </p>

      <h2>8. Droit applicable</h2>
      <p>
        Le présent site et ses mentions légales sont soumis au droit français. Tout litige relatif à l'utilisation du site
        sera soumis à la compétence exclusive des tribunaux français.
      </p>

      <h2>9. Contact</h2>
      <p>
        Pour toute question relative au site ou à son contenu :<br />
        Email : <a href="mailto:contact@vellio.fr" className="text-primary-600">contact@vellio.fr</a><br />
        Formulaire de contact : <a href="/contact" className="text-primary-600">vellio.fr/contact</a>
      </p>
    </article>
  );
}
