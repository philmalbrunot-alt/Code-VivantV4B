import { FREE_MODEL, PREMIUM_MODEL } from '@/lib/constants';
import { buildFreeFallback, buildPremiumFallback } from '@/lib/fallback';
import { buildFreePrompt, buildPremiumPrompt } from '@/lib/prompts';
import type { FreeReading, PremiumReading, QuizAnswers } from '@/lib/types';

async function callOpenAI<T>(model: string, prompt: string): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY manquante.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.85,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'Tu produis uniquement du JSON valide, sans markdown et sans texte hors JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI ${response.status}: ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Réponse OpenAI vide.');
  return JSON.parse(content) as T;
}

export async function generateFreeReading(answers: QuizAnswers): Promise<FreeReading> {
  try {
    return await callOpenAI<FreeReading>(FREE_MODEL, buildFreePrompt(answers));
  } catch (error) {
    console.error('free generation fallback', error);
    return buildFreeFallback(answers);
  }
}

export async function generatePremiumReading(answers: QuizAnswers): Promise<PremiumReading> {
  try {
    return await callOpenAI<PremiumReading>(PREMIUM_MODEL, buildPremiumPrompt(answers));
  } catch (error) {
    console.error('premium generation fallback', error);
    return buildPremiumFallback(answers);
  }
}
