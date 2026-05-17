import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Newsletter from "@/components/ui/Newsletter";

interface Props {
  params: { slug: string };
}

const articles: Record<string, {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  content: string[];
}> = {
  "art-du-detail-maison-vellio": {
    title: "L'art du détail dans une maison contemporaine",
    excerpt: "Comment quelques objets bien choisis peuvent transformer la perception d'un intérieur sans le surcharger.",
    image: "https://images.pexels.com/photos/10736999/pexels-photo-10736999.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Maison",
    readTime: "5 min",
    date: "17 mai 2026",
    content: [
      "Un intérieur premium ne dépend pas du nombre d'objets qu'il contient. Il dépend de la qualité des gestes qu'il permet. Une lampe bien proportionnée, un organiseur discret, une station de charge nette : ces pièces changent l'atmosphère parce qu'elles retirent du bruit.",
      "Chez Vellio, la sélection commence par une question simple : l'objet rend-il le quotidien plus clair ? Si la réponse est oui, nous regardons ensuite la ligne, la matière, l'usage réel et la capacité de la pièce à rester élégante dans le temps.",
      "Le luxe moderne est silencieux. Il n'a pas besoin de signaler sa valeur par l'excès. Il se reconnaît dans la précision, la stabilité, l'évidence du geste.",
    ],
  },
  "tech-signature-sans-bruit-visuel": {
    title: "La tech signature : utile, sobre, presque invisible",
    excerpt: "Les accessoires technologiques premium doivent simplifier le quotidien sans imposer leur présence.",
    image: "https://images.pexels.com/photos/9741343/pexels-photo-9741343.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Tech",
    readTime: "4 min",
    date: "16 mai 2026",
    content: [
      "La technologie premium ne cherche pas l'effet. Elle clarifie. Elle charge mieux, range mieux, éclaire mieux, connecte mieux. Et surtout, elle disparaît visuellement une fois intégrée dans l'espace.",
      "Un bon accessoire tech doit avoir trois qualités : une fonction évidente, une finition calme et une compatibilité suffisamment large pour durer. Les objets trop démonstratifs vieillissent vite ; les objets précis restent.",
      "C'est cette ligne que nous privilégions dans la collection Tech Signature : aluminium, graphite, gestes simples et formats compacts.",
    ],
  },
  "cadeaux-haut-de-gamme-utiles": {
    title: "Offrir utile sans perdre l'émotion",
    excerpt: "Une bonne pièce cadeau conjugue usage réel, finition soignée et récit suffisamment personnel.",
    image: "https://images.pexels.com/photos/9775357/pexels-photo-9775357.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Cadeau",
    readTime: "6 min",
    date: "15 mai 2026",
    content: [
      "Le cadeau idéal n'est pas seulement beau. Il trouve une place dans la vie de la personne qui le reçoit. C'est pour cela que les objets utiles, lorsqu'ils sont bien dessinés, peuvent être plus mémorables que les cadeaux purement décoratifs.",
      "La sélection Vellio privilégie les pièces qui portent un usage clair : organiser, éclairer, accompagner un rituel, simplifier un déplacement, améliorer un espace de travail.",
      "L'émotion vient du choix juste. Une pièce bien choisie dit : j'ai remarqué ton rythme, tes gestes, ton quotidien.",
    ],
  },
  "rituels-beaute-minimalistes": {
    title: "Rituels beauté minimalistes, gestes précis",
    excerpt: "La beauté premium n'est pas l'accumulation : c'est le choix du bon geste, au bon moment.",
    image: "https://images.pexels.com/photos/28255125/pexels-photo-28255125.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Beauté",
    readTime: "4 min",
    date: "14 mai 2026",
    content: [
      "Un rituel de beauté contemporain doit rester lisible. Trop de produits, trop d'étapes, trop de promesses : le geste perd sa force. Les pièces que nous retenons doivent au contraire apporter de la précision.",
      "Lumière douce, contact agréable, format stable, entretien simple : ces critères comptent autant que la performance annoncée. Une belle routine est celle que l'on répète sans effort.",
      "Dans l'univers Beauté Architecturée, Vellio choisit des objets qui rendent le soin plus calme et plus intentionnel.",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles[params.slug];
  if (!article) return { title: "Article introuvable" };
  return { title: `${article.title} — Journal Vellio`, description: article.excerpt };
}

export default function ArticlePage({ params }: Props) {
  const article = articles[params.slug];
  if (!article) notFound();

  return (
    <div className="bg-brand-ivory">
      <Container className="py-10 sm:py-16">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand/55 transition-colors hover:text-brand">
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>

        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-accent">{article.category}</p>
          <h1 className="mt-4 text-balance font-serif text-5xl font-semibold leading-[0.92] text-brand sm:text-7xl">{article.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-brand/62">{article.excerpt}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.18em] text-brand/38">{article.date} · {article.readTime}</p>
        </div>

        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-card">
          <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" priority />
        </div>

        <article className="mx-auto mt-12 max-w-3xl space-y-7 text-base leading-8 text-brand/68">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </Container>
      <Newsletter />
    </div>
  );
}
