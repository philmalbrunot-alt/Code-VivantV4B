import { getStripe } from '@/lib/stripe';
import { getReading, updateReading } from '@/lib/reading';
import { generatePremiumReading } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Configuration webhook manquante.', { status: 400 });
  }

  try {
    const payload = await req.text();
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const token = session.metadata?.token;
      if (token) {
        const record = await getReading(token);
        if (record && record.status !== 'ready') {
          const premium = await generatePremiumReading(record.answers);
          await updateReading(token, { paid: true, status: 'ready', premium });
        }
      }
    }

    return new Response('ok');
  } catch (error) {
    console.error('stripe/webhook error', error);
    return new Response('Webhook error', { status: 400 });
  }
}
