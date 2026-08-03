# Refresh mensuel best-sellers Vellio — comment ça marche

**Pourquoi ce n'est pas un vrai cron automatique sans intervention :**
Amazon bloque le scraping automatisé depuis un serveur cloud (vérifié le
2026-08-04 — page "cliquez pour continuer" au lieu du contenu). La seule
méthode fiable est un vrai navigateur connecté à un vrai compte Amazon,
comme celle utilisée aujourd'hui pour les 44 produits actuels.

**Ce qui est réellement automatisé (aucune action de Kenams requise) :**
Une tâche planifiée Windows (`VellioMonthlyReminder`) s'exécute le 1er de
chaque mois à 10h et envoie une notification (Telegram si configuré,
sinon email via le mécanisme kah-reminders existant) : "Il est temps de
rafraîchir le catalogue Vellio — lance la commande Claude Code
'rafraîchis le catalogue Vellio' et laisse-moi faire le reste."

**Ce qu'un agent (Claude Code) fait à ce moment-là, en Fullgod, sans
questions :**
1. Ouvre une session Chrome connectée à Amazon.fr (le compte de Kenams
   est déjà loggé via le profil Chrome partagé)
2. Va sur les pages "Meilleures ventes" des catégories réelles du site
   (High-Tech, Beauté, Sport)
3. Extrait titre/prix/photos/bullets réels des 15-20 nouveaux produits
   qui ne sont pas déjà dans le catalogue (même méthode que le
   2026-08-04 : JS `colorImages` + `#feature-bullets`, jamais de
   contournement anti-bot)
4. Vérifie chaque image (HEAD request, 200 uniquement)
5. Insère en base (jamais de suppression des produits existants sans
   validation — ajout uniquement, ou remplacement des moins pertinents
   si le catalogue dépasse ~60 produits)
6. Déploie si du code a changé (normalement non, juste la DB)
7. Poste un résumé dans le prochain digest KAH Workforce / Telegram

**Prochaine étape technique réelle à poser** (pas encore fait, nécessite
Kenams) : créer la tâche planifiée Windows `VellioMonthlyReminder` via
`schtasks`, et brancher la notification sur un canal qu'il consulte
vraiment (Telegram déjà actif sur KAH Workforce est le plus fiable).
