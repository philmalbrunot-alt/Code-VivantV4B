export const BRAND = {
  label: 'DIAGNOSTIC INTÉRIEUR',
  title: 'Votre portrait intérieur : ce qui vous protège et vous bloque',
  subtitle:
    'Mettez en lumière le mécanisme intérieur qui vous protège encore… mais vous retient de vivre plus pleinement.',
  paragraph:
    'Répondez à quelques questions et recevez un premier décryptage de votre mode de protection, de votre blocage central et de ce qui cherche à bouger en vous.',
  method:
    'Votre portrait s’appuie sur la numérologie, une lecture psychospirituelle et une approche systémique de vos schémas profonds.',
  badges: ['DIAGNOSTIC EXPRESS', 'APERÇU GRATUIT', 'LECTURE IMMÉDIATE'] as const,
  cta: 'Voir mon portrait',
};

export const BOOKING_URL = 'https://koalendar.com/e/echange-avec-philippe-malbrunot';

export const FREE_MODEL = process.env.OPENAI_FREE_MODEL || 'gpt-5.4-mini';
export const PREMIUM_MODEL = process.env.OPENAI_PREMIUM_MODEL || 'gpt-5.4-mini';
