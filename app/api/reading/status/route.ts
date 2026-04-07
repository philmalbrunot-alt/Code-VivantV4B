import { NextResponse } from 'next/server';
import { getReading } from '@/lib/reading';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Token manquant.' }, { status: 400 });
  const record = await getReading(token);
  if (!record) return NextResponse.json({ error: 'Lecture introuvable.' }, { status: 404 });
  return NextResponse.json({ status: record.status, error: record.error });
}
