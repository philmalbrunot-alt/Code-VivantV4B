'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Questionnaire } from '@/components/questionnaire';
import { BadgeRow, BrandHeader, Container, Label, Panel, PrimaryButton, Shell } from '@/components/ui';
import { BRAND } from '@/lib/constants';
import type { FreeReading, QuizAnswers } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(answers: QuizAnswers) {
    try {
      setSubmitting(true);
      const res = await fetch('/api/analyze/free', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(answers),
      });
      const data = (await res.json()) as { free?: FreeReading; error?: string };
      if (!res.ok || !data.free) throw new Error(data.error || 'Impossible de générer l’aperçu gratuit.');
      localStorage.setItem('cv4-free', JSON.stringify({ answers, free: data.free }));
      router.push('/resultat');
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Impossible de générer le portrait pour le moment.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Shell>
      <Container>
        <BrandHeader />
        {!started ? (
          <Panel className="py-12 md:py-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cv-gold/20 bg-cv-panelAlt text-cv-gold">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="mt-8">
                <Label>{BRAND.label}</Label>
                <h1 className="mt-4 font-serif text-4xl leading-tight text-cv-text md:text-7xl">{BRAND.title}</h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cv-text/90 md:text-2xl">{BRAND.subtitle}</p>
                <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-cv-muted md:text-base">{BRAND.paragraph}</p>
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-cv-muted md:text-base">{BRAND.method}</p>
              </div>
              <BadgeRow items={BRAND.badges} />
              <PrimaryButton type="button" onClick={() => setStarted(true)} className="mt-10 min-w-[190px]">
                {BRAND.cta}
              </PrimaryButton>
            </div>
          </Panel>
        ) : (
          <Questionnaire onSubmit={handleSubmit} isSubmitting={submitting} />
        )}
      </Container>
    </Shell>
  );
}
