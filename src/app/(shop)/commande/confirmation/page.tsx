export const dynamic = "force-dynamic";
import Link from "next/link";
import { CheckCircle2, Package, Truck, Mail, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";

interface Props {
  searchParams: { session_id?: string };
}

async function getOrderBySession(sessionId: string) {
  return prisma.order.findFirst({
    where: { stripeSessionId: sessionId },
    include: {
      items: true,
    },
  });
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id;
  const order = sessionId ? await getOrderBySession(sessionId) : null;

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-black text-brand mb-3">Commande introuvable</h1>
        <p className="text-gray-500 mb-6">
          Nous n'avons pas trouvé de commande associée à cette session. Si vous venez de payer, vérifiez votre boîte mail.
        </p>
        <Link href="/produits" className="btn-primary">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const steps = [
    { icon: CheckCircle2, label: "Commande confirmée", done: true, color: "text-green-500 bg-green-50" },
    { icon: Package, label: "En préparation (1-2j)", done: order.status !== "PENDING", color: "text-blue-500 bg-blue-50" },
    { icon: Truck, label: "Expédition (7-14j)", done: order.status === "SHIPPED" || order.status === "DELIVERED", color: "text-purple-500 bg-purple-50" },
    { icon: CheckCircle2, label: "Livré !", done: order.status === "DELIVERED", color: "text-brand-accent bg-red-50" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5 shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-4xl font-black text-brand mb-3">Merci pour votre commande !</h1>
        <p className="text-gray-500 text-lg">
          Commande <span className="font-bold text-brand">{order.orderNumber}</span> confirmée le{" "}
          {formatDate(order.createdAt)}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-400">
          <Mail className="w-4 h-4" />
          Un email de confirmation a été envoyé à <strong className="text-gray-600">{order.customerEmail}</strong>
        </div>
      </div>

      {/* Suivi étapes */}
      <div className="card p-6 mb-6">
        <h2 className="font-black text-brand text-lg mb-5">Suivi de commande</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {steps.map(({ icon: Icon, label, done, color }, i) => (
            <div key={i} className={`flex-1 flex flex-col items-center text-center gap-2 ${done ? "opacity-100" : "opacity-40"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${done ? color : "bg-gray-100 text-gray-400"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-600">{label}</span>
            </div>
          ))}
        </div>
        {order.trackingNumber && (
          <div className="mt-4 bg-blue-50 rounded-xl px-4 py-3 text-sm text-blue-800">
            <strong>Numéro de suivi :</strong> {order.trackingNumber}
          </div>
        )}
      </div>

      {/* Détail commande */}
      <div className="card p-6 mb-6">
        <h2 className="font-black text-brand text-lg mb-4">Détail de la commande</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="font-medium text-sm text-brand">{item.name}</p>
                <p className="text-xs text-gray-400">Qté : {item.quantity}</p>
              </div>
              <span className="font-bold text-brand">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between font-black text-brand text-base">
          <span>Total payé</span>
          <span className="text-brand-accent">{formatPrice(order.total)}</span>
        </div>
      </div>

      {/* Adresse livraison */}
      {order.shippingAddress && typeof order.shippingAddress === "object" && (
        <div className="card p-6 mb-8">
          <h2 className="font-black text-brand text-lg mb-3">Adresse de livraison</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{order.customerName}</p>
            {(order.shippingAddress as any).line1 && <p>{(order.shippingAddress as any).line1}</p>}
            {(order.shippingAddress as any).city && (
              <p>
                {(order.shippingAddress as any).postalCode} {(order.shippingAddress as any).city}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/suivi?order=${order.orderNumber}&email=${encodeURIComponent(order.customerEmail)}`} className="btn-secondary flex items-center justify-center gap-2">
          <Truck className="w-4 h-4" /> Suivre ma commande
        </Link>
        <Link href="/produits" className="btn-primary flex items-center justify-center gap-2">
          Continuer mes achats <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
