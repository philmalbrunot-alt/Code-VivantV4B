'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrandHeader, Container, Shell } from '@/components/ui';
import { FreeResult } from '@/components/free-result';
import type { FreeReading, QuizAnswers } from '@/lib/types';

export default function ResultatPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [free, setFree] = useState<FreeReading | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('cv4-free');
    if (!raw) {
      router.replace('/');
      return;
    }
    const parsed = JSON.parse(raw) as { answers: QuizAnswers; free: FreeReading };
    setAnswers(parsed.answers);
    setFree(parsed.free);
  }, [router]);

  async function unlock() {
    if (!answers || !free) return;
    try {
      setUnlocking(true);
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ answers, free }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Impossible de créer la session de paiement.');
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Impossible de lancer le paiement.');
      setUnlocking(false);
    }
  }

  if (!answers || !free) return null;

  return (
    <Shell>
      <Container>
        <BrandHeader />
        <FreeResult answers={answers} reading={free} onUnlock={unlock} unlocking={unlocking} />
      </Container>
    </Shell>
  );
}
