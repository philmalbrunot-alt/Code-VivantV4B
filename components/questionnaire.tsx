'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, MapPin, User } from 'lucide-react';
import { PrimaryButton, ProgressBar, SecondaryButton, Panel } from '@/components/ui';
import type { QuizAnswers } from '@/lib/types';

const steps = [
  {
    key: 'firstName',
    title: 'Votre prénom',
    subtitle: 'Il sera réutilisé avec parcimonie, uniquement pour ancrer la lecture.',
    icon: User,
    type: 'text',
    placeholder: 'Ex. Martin',
  },
  {
    key: 'birthDate',
    title: 'Votre date de naissance',
    subtitle: 'Format demandé : JJ/MM/AAAA',
    icon: Calendar,
    type: 'text',
    placeholder: 'Ex. 15/10/2002',
  },
  {
    key: 'birthPlace',
    title: 'Votre lieu de naissance',
    subtitle: 'Ville ou commune de naissance.',
    icon: MapPin,
    type: 'text',
    placeholder: 'Ex. Aix-les-Bains',
  },
  {
    key: 'currentFocus',
    title: 'Qu’est-ce qui vous amène ici ?',
    subtitle: 'Choisissez ce qui résonne le plus aujourd’hui.',
    icon: User,
    type: 'choice',
    options: [
      'Je me sens bloqué(e), comme si je tournais en rond',
      'Je traverse une période de changement ou de doute',
      'Je veux mieux me comprendre, en profondeur',
      'Mes relations m’épuisent ou me questionnent',
      'Simple curiosité, je veux voir ce que ça donne',
    ],
  },
  {
    key: 'energyState',
    title: 'En ce moment, votre niveau d’énergie ressemble à…',
    subtitle: 'Choisissez la formule la plus juste.',
    icon: User,
    type: 'choice',
    options: [
      'Épuisé(e), même le repos ne suffit plus',
      'Des hauts et des bas, je ne sais jamais comment je vais me réveiller',
      'Sous tension, je tiens, mais je sens que ça tire',
      'Plat, pas de fatigue extrême, mais pas d’élan non plus',
      'Plutôt bien, mais quelque chose manque quand même',
    ],
  },
  {
    key: 'stressResponse',
    title: 'Quand ça ne va pas, vous faites quoi le plus souvent ?',
    subtitle: 'Choisissez votre réflexe dominant.',
    icon: User,
    type: 'choice',
    options: [
      'Je me replie et je disparais un peu',
      'Je suranalyse tout',
      'Je m’occupe des autres pour éviter de me regarder',
      'Je deviens irritable ou sec',
      'Je fais comme si tout allait bien',
    ],
  },
] as const;

const initialAnswers: QuizAnswers = {
  firstName: '',
  birthDate: '',
  birthPlace: '',
  currentFocus: '',
  energyState: '',
  stressResponse: '',
};

export function Questionnaire({ onSubmit, isSubmitting = false }: { onSubmit: (values: QuizAnswers) => void; isSubmitting?: boolean }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);

  const step = steps[index];
  const progress = ((index + 1) / steps.length) * 100;

  const canContinue = useMemo(() => {
    const value = answers[step.key];
    return typeof value === 'string' && value.trim().length > 0;
  }, [answers, step.key]);

  function updateValue(value: string) {
    setAnswers((prev) => ({ ...prev, [step.key]: value }));
  }

  function next() {
    if (!canContinue) return;
    if (index === steps.length - 1) return onSubmit(answers);
    setIndex((prev) => prev + 1);
  }

  function back() {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
  }

  return (
    <Panel className="mt-8">
      <ProgressBar value={progress} />
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cv-gold/20 bg-cv-panelAlt text-cv-gold">
          <step.icon className="h-5 w-5" />
        </div>
        <h2 className="mt-6 text-center font-serif text-3xl text-cv-text md:text-5xl">{step.title}</h2>
        <p className="mt-3 text-center text-sm leading-7 text-cv-muted md:text-base">{step.subtitle}</p>

        <div className="mt-8">
          {step.type === 'text' && (
            <input className="input-dark" value={answers[step.key]} onChange={(e) => updateValue(e.target.value)} placeholder={step.placeholder} />
          )}
          {step.type === 'choice' && (
            <div className="space-y-3">
              {step.options?.map((option) => {
                const selected = answers[step.key] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateValue(option)}
                    className={selected ? 'w-full rounded-2xl border border-cv-gold/30 bg-cv-gold/10 px-5 py-4 text-left text-sm leading-7 text-cv-text' : 'w-full rounded-2xl border border-cv-line bg-cv-panelAlt px-5 py-4 text-left text-sm leading-7 text-cv-muted'}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <SecondaryButton type="button" onClick={back} className="min-w-[120px]">
            <ArrowLeft className="h-4 w-4" /> Retour
          </SecondaryButton>
          <PrimaryButton type="button" onClick={next} disabled={!canContinue || isSubmitting} className="min-w-[160px]">
            {index === steps.length - 1 ? 'Voir mon portrait' : 'Continuer'} <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>
    </Panel>
  );
}
