import { NextResponse } from 'next/server';
import { getReading, updateReading } from '@/lib/reading';
import { generatePremiumReading } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token manquant.' }, { status: 400 });
  }

  const record = await getReading(token);
  if (!record) {
    return NextResponse.json({ error: 'Lecture introuvable.' }, { status: 404 });
  }

  if (record.status === 'ready') {
    return NextResponse.json({ status: 'ready' });
  }

  if (record.status === 'failed') {
    return NextResponse.json({
      status: 'failed',
      error: record.error || 'La lecture a échoué.',
    });
  }

  if (record.status === 'processing') {
    return NextResponse.json({ status: 'processing' });
  }

  if (record.status === 'pending') {
    await updateReading(token, { status: 'processing' });

    try {
      const premium = await generatePremiumReading(record.answers);
      await updateReading(token, {
        status: 'ready',
        premium,
        paid: true,
      });

      return NextResponse.json({ status: 'ready' });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'La génération premium a échoué.';

      await updateReading(token, {
        status: 'failed',
        error: message,
      });

      return NextResponse.json({
        status: 'failed',
        error: message,
      });
    }
  }

  return NextResponse.json({
    status: record.status,
    error: record.error,
  });
}
