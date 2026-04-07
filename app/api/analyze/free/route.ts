import { NextResponse } from 'next/server';
import { generateFreeReading } from '@/lib/openai';
import { quizAnswersSchema } from '@/lib/schema';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const answers = quizAnswersSchema.parse(json);
    const free = await generateFreeReading(answers);
    return NextResponse.json({ free });
  } catch (error) {
    console.error('analyze/free error', error);
    const message = error instanceof Error ? error.message : 'Impossible de générer l’aperçu gratuit.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
