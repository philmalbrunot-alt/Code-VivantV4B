'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrandHeader, Container, Panel, Shell } from '@/components/ui';

const steps = [
  'Lecture du schéma principal',
  'Mise en relation des tensions profondes',
  'Clarification du rapport à la légitimité',
  'Détection de l’élan retenu',
  'Finalisation de votre lecture complète',
];

export function PrepareScreen({ token }: { token: string }) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [message, setMessage] = useState('Cela peut prendre quelques instants.');

  useEffect(() => {
    let cancelled = false;

    const interval = window.setInterval(async () => {
      try {
        const res = await fetch(`/api/reading/status?token=${encodeURIComponent(token)}`, {
          cache: 'no-store',
        });

        const data = await res.json();

        if (cancelled) return;

        if (data.status === 'ready') {
          window.clearInterval(interval);
          router.replace(`/lecture/${token}`);
          return;
        }

        if (data.status === 'processing') {
          setMessage('Votre lecture complète est en cours de finalisation.');
        } else if (data.status === 'failed') {
          setMessage(data.error || 'La lecture demande un peu plus de temps que prévu. Réessayez dans quelques instants.');
        } else {
          setMessage('Nous préparons votre lecture complète.');
        }
      } catch {
        if (!cancelled) {
          setMessage('La lecture demande un peu plus de temps que prévu. Réessayez dans quelques instants.');
        }
      }

      setActive((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [router, token]);

  return (
    <Shell>
      <Container>
        <BrandHeader />
        <Panel className="py-10 md:py-14">
          <p className="text-center text-[11px] uppercase tracking-[0.26em] text-cv-gold/85">LECTURE COMPLÈTE</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-center font-serif text-4xl leading-tight text-cv-text md:text-7xl">
            Votre lecture complète se prépare
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-center text-base leading-8 text-cv-text/90 md:text-2xl">
            Nous relions maintenant votre mode de protection, le verrou principal, votre rapport à la légitimité, l’élan retenu et la direction de bascule la plus juste.
          </p>
          <p className="mt-5 text-center text-sm leading-7 text-cv-faint md:text-base">{message}</p>

          <div className="mx-auto mt-10 max-w-4xl space-y-4">
            {steps.map((step, index) => {
              const done = index <= active;
              return (
                <div
                  key={step}
                  className={`rounded-2xl border px-5 py-5 text-lg md:text-2xl ${
                    done
                      ? 'border-cv-gold/25 bg-cv-gold/10 text-cv-text'
                      : 'border-cv-line bg-cv-panelAlt text-cv-muted'
                  }`}
                >
                  {index + 1}. {step}
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-[11px] uppercase tracking-[0.26em] text-cv-gold/85">
            Vous avez franchi un premier seuil. La suite entre au cœur du nœud.
          </p>
        </Panel>
      </Container>
    </Shell>
  );
}
