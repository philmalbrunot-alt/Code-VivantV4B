'use client';

import { Lock, Share2 } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';
import type { FreeReading, QuizAnswers } from '@/lib/types';
import { AnchorButton, Panel, PrimaryButton, SecondaryButton } from '@/components/ui';

export function FreeResult({
  answers,
  reading,
  onUnlock,
  unlocking,
}: {
  answers: QuizAnswers;
  reading: FreeReading;
  onUnlock: () => void;
  unlocking: boolean;
}) {
  return (
    <div className="space-y-6">
      <Panel>
        <p className="text-[11px] uppercase tracking-[0.26em] text-cv-gold/85">APERÇU GRATUIT</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-cv-text md:text-6xl">Ce que votre portrait révèle</h1>
        <p className="mt-4 text-base leading-8 text-cv-text/90">{reading.hero}</p>
        <p className="mt-5 text-sm leading-7 text-cv-muted md:text-base">{reading.reveal}</p>
      </Panel>

      {reading.sections.map((section) => (
        <Panel key={section.title}>
          <h2 className="font-serif text-2xl text-cv-text md:text-3xl">{section.title}</h2>
          <p className="mt-4 text-sm leading-8 text-cv-muted md:text-base">{section.body}</p>
        </Panel>
      ))}

      <Panel>
        <div className="flex items-center gap-3 text-cv-gold">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cv-gold/20 bg-cv-panelAlt">
            <Lock className="h-4 w-4" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-cv-gold/85">{reading.locked.label}</p>
        </div>
        <h2 className="mt-4 font-serif text-3xl text-cv-text md:text-5xl">{reading.locked.title}</h2>
        <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base">{reading.locked.body}</p>
        <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base">{reading.locked.body2}</p>
        <p className="mt-6 text-sm leading-7 text-cv-faint">{reading.locked.line}</p>
      </Panel>

      <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
        <Panel>
          <h3 className="font-serif text-3xl text-cv-text">Profil complet</h3>
          <p className="mt-3 text-5xl font-semibold text-cv-gold">7 €</p>
          <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base">
            Déverrouillez la lecture complète : le verrou principal, l’héritage invisible, le rapport à la légitimité, l’élan retenu et la direction de bascule la plus juste.
          </p>
          <PrimaryButton type="button" onClick={onUnlock} disabled={unlocking} className="mt-6 w-full md:w-auto">
            {unlocking ? 'Ouverture du paiement…' : 'Déverrouiller mon portrait complet'}
          </PrimaryButton>
        </Panel>

        <Panel>
          <p className="text-[11px] uppercase tracking-[0.26em] text-cv-gold/85">ACCOMPAGNEMENT PRIVÉ</p>
          <h3 className="mt-3 font-serif text-3xl text-cv-text">Séance avec Philippe</h3>
          <p className="mt-3 text-5xl font-semibold text-cv-gold">97 €</p>
          <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base">
            1 h en visio pour travailler l’endroit exact où votre verrou se rejoue aujourd’hui. La lecture complète est incluse.
          </p>
          <AnchorButton href={BOOKING_URL} target="_blank" rel="noreferrer" className="mt-6 w-full md:w-auto">
            Réserver ma séance
          </AnchorButton>
        </Panel>
      </div>

      <Panel>
        <h3 className="font-serif text-3xl text-cv-text md:text-4xl">Vous avez pensé à quelqu’un en lisant ceci ?</h3>
        <p className="mt-3 text-sm leading-7 text-cv-muted md:text-base">Partagez-lui cette expérience.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <SecondaryButton type="button" onClick={() => navigator.clipboard.writeText(window.location.href)}>
            <Share2 className="h-4 w-4" /> Copier le lien
          </SecondaryButton>
          <AnchorButton href={`mailto:?subject=Code Vivant&body=${encodeURIComponent(window.location.href)}`}>
            Envoyer le lien
          </AnchorButton>
        </div>
      </Panel>

      <p className="text-center text-xs leading-6 text-cv-faint">Cette lecture est générée en temps réel. Elle n’a pas vocation à poser un diagnostic clinique. Elle éclaire un mécanisme intérieur pour vous aider à sortir du mode survie avec plus de clarté.</p>
    </div>
  );
}
