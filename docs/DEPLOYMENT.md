# Guide de déploiement Vellio sur Vercel

## Prérequis

- Compte Vercel (vercel.com)
- Base de données PostgreSQL (Neon recommandé — neon.tech, plan gratuit suffisant pour le lancement)
- Compte Stripe (stripe.com)
- Compte OpenAI (platform.openai.com)
- Compte Resend (resend.com) pour les emails

---

## 1. Base de données — Neon PostgreSQL

1. Créer un compte sur [neon.tech](https://neon.tech)
2. Créer un nouveau projet : `vellio-db`
3. Copier la `DATABASE_URL` (format : `postgresql://user:pass@host/db?sslmode=require`)
4. Appliquer le schema Prisma :
   ```bash
   DATABASE_URL="votre_url" npx prisma db push
   ```
5. Lancer le seed pour les données d'exemple :
   ```bash
   DATABASE_URL="votre_url" npm run db:seed
   ```

---

## 2. Stripe — Configuration paiement

### Clés API
1. Aller sur [dashboard.stripe.com](https://dashboard.stripe.com) > Développeurs > Clés API
2. Copier `STRIPE_SECRET_KEY` (commence par `sk_live_` ou `sk_test_` pour les tests)
3. Copier `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (commence par `pk_`)

### Webhook Stripe
1. Dans Stripe Dashboard > Développeurs > Webhooks
2. Cliquer **Ajouter un endpoint**
3. URL : `https://vellio.fr/api/stripe/webhook`
4. Événements à écouter :
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copier le **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### Test du webhook en local (développement)
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 3. OpenAI — Module IA

1. Créer un compte sur [platform.openai.com](https://platform.openai.com)
2. Générer une clé API : API Keys > Create new secret key
3. Copier → `OPENAI_API_KEY`
4. Modèle recommandé : `gpt-4o-mini` (économique) ou `gpt-4o` (meilleur)
5. Définir `OPENAI_MODEL=gpt-4o-mini` dans les variables d'env

---

## 4. Resend — Emails transactionnels

1. Créer un compte sur [resend.com](https://resend.com)
2. Vérifier votre domaine (vellio.fr) : ajouter les enregistrements DNS TXT/MX
3. Créer une clé API → `RESEND_API_KEY`
4. `EMAIL_FROM=Vellio <noreply@vellio.fr>`

---

## 5. Variables d'environnement complètes

Créer un fichier `.env.local` en local, et configurer dans Vercel Dashboard > Settings > Environment Variables.

```env
# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# App
NEXT_PUBLIC_APP_URL=https://vellio.fr

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini

# Resend (email)
RESEND_API_KEY=re_...
EMAIL_FROM=Vellio <noreply@vellio.fr>
CONTACT_EMAIL=support@vellio.fr

# Admin
ADMIN_SECRET=changez-ce-mot-de-passe-en-production

# Analytics (optionnel)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=vellio.fr

# Cron (optionnel, pour sécuriser le endpoint cron)
CRON_SECRET=un-secret-aléatoire
```

---

## 6. Déploiement sur Vercel

### Première fois
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer (depuis la racine du projet)
vercel --prod
```

### Via GitHub (recommandé)
1. Push le repo sur GitHub : `git push origin main`
2. Aller sur [vercel.com/new](https://vercel.com/new)
3. Importer le repo GitHub `vellio-shop`
4. Framework : **Next.js** (détecté automatiquement)
5. Ajouter toutes les variables d'environnement (voir section 5)
6. Cliquer **Deploy**

---

## 7. Domaine personnalisé

1. Dans Vercel Dashboard > votre projet > Settings > Domains
2. Ajouter `vellio.fr` et `www.vellio.fr`
3. Configurer les DNS chez votre registrar :
   ```
   A     @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```
4. Attendre la propagation DNS (5 min à 48h)
5. Vercel active HTTPS automatiquement via Let's Encrypt

---

## 8. Configuration post-déploiement

### Mettre à jour le webhook Stripe
- Remplacer l'URL webhook par `https://vellio.fr/api/stripe/webhook`

### Prisma migrations en production
```bash
# Appliquer les migrations Prisma
vercel env pull .env.local
npx prisma db push
```

### Seed en production
```bash
DATABASE_URL="prod_url" npm run db:seed
```

---

## 9. Cron GitHub Actions (mise à jour scores tendance)

Créer `.github/workflows/cron-trend.yml` :

```yaml
name: Cron Trend Score
on:
  schedule:
    - cron: '0 3 * * *'  # Tous les jours à 3h du matin UTC
  workflow_dispatch:

jobs:
  update-trends:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run cron:trend
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXT_PUBLIC_APP_URL: ${{ secrets.NEXT_PUBLIC_APP_URL }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          CRON_SECRET: ${{ secrets.CRON_SECRET }}
```

---

## 10. Monitoring et logs

- **Logs Vercel** : Dashboard > votre projet > Logs (temps réel)
- **Monitoring erreurs** : intégrer Sentry (optionnel) — `npm install @sentry/nextjs`
- **Analytics** : Plausible (déjà configuré) ou Vercel Analytics (`npm install @vercel/analytics`)
- **Uptime** : Better Uptime ou UptimeRobot (gratuit, alertes email)

---

## Checklist de lancement

- [ ] Base de données créée et migrée
- [ ] Stripe en mode live (pas test)
- [ ] Webhook Stripe configuré avec l'URL de production
- [ ] Domaine `vellio.fr` pointé vers Vercel
- [ ] HTTPS actif
- [ ] Email de confirmation testé (passage commande test)
- [ ] Page admin accessible (`/admin`)
- [ ] Mot de passe admin changé (`ADMIN_SECRET`)
- [ ] Produits publiés (au moins 6)
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt vérifié
- [ ] Google Search Console soumis
