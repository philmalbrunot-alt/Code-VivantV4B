# Code Vivant V4 Clean

Base propre pour le funnel :
- landing + questionnaire
- aperçu gratuit
- Stripe Checkout
- page d'attente
- lecture complète
- séance privée

## Variables Vercel

- OPENAI_API_KEY
- OPENAI_FREE_MODEL=gpt-5.4-mini
- OPENAI_PREMIUM_MODEL=gpt-5.4-mini
- APP_BASE_URL=https://votre-projet.vercel.app
- STRIPE_SECRET_KEY
- STRIPE_PRICE_ID_PROFILE
- STRIPE_WEBHOOK_SECRET
- KV_REST_API_URL
- KV_REST_API_TOKEN
- BREVO_API_KEY (optionnel)
- BREVO_FROM_EMAIL (optionnel)

## Stockage

Cette version utilise `@upstash/redis` avec les variables `KV_REST_API_URL` et `KV_REST_API_TOKEN`.
Sur Vercel, connectez un store Redis via Storage. Les variables sont injectées automatiquement.

## Date de naissance

Format demandé côté interface : `JJ/MM/AAAA`.

## Test Stripe

- activez le mode test dans Stripe
- utilisez une clé `sk_test_...`
- utilisez un `price_...` de test
- webhook pointé vers `/api/stripe/webhook`

## Déploiement

1. créer un nouveau dépôt GitHub
2. envoyer tout le contenu du projet
3. créer un nouveau projet Vercel
4. connecter le store Redis/KV
5. ajouter les variables manquantes
6. déployer
