import { NextResponse } from 'next/server';
import { checkoutPayloadSchema } from '@/lib/schema';
import { getBaseUrl, slugToken } from '@/lib/utils';
import { saveReading } from '@/lib/reading';
import { getStripe } from '@/lib/stripe';
import { generateFreeReading } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const payload = checkoutPayloadSchema.parse(json);
    const token = slugToken();
    const free = payload.free ?? (await generateFreeReading(payload.answers));

    await saveReading({
      token,
      paid: false,
      status: 'pending',
      answers: payload.answers,
      free,
      createdAt: new Date().toISOString(),
    });

    const stripe = getStripe();
    const baseUrl = getBaseUrl(req);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_PROFILE,
          quantity: 1,
        },
      ],
      metadata: { token },
      success_url: `${baseUrl}/checkout/success?token=${encodeURIComponent(token)}`,
      cancel_url: `${baseUrl}/resultat`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('checkout/create error', error);
    const message = error instanceof Error ? error.message : 'Impossible de créer la session de paiement.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
