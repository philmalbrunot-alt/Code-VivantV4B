import type { PremiumReading } from '@/lib/types';

export async function sendPremiumEmail(to: string, premium: PremiumReading) {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_FROM_EMAIL;
  if (!apiKey || !fromEmail || !to) return;

  const html = `
    <h1>${premium.heroTitle}</h1>
    <p>${premium.heroBody}</p>
    ${premium.steps.map((step) => `<h2>${step.title}</h2><p>${step.body}</p>`).join('')}
  `;

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: 'Code Vivant' },
      to: [{ email: to }],
      subject: 'Votre lecture complète Code Vivant',
      htmlContent: html,
    }),
  }).catch((error) => {
    console.error('brevo send failed', error);
  });
}
