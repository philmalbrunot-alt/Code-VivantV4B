import { BOOKING_URL } from '@/lib/constants';
import type { PremiumReading } from '@/lib/types';
import { AnchorButton, Panel } from '@/components/ui';

export function PremiumReadingView({ reading }: { reading: PremiumReading }) {
  return (
    <div className="space-y-6">
      <Panel>
        <p className="text-[11px] uppercase tracking-[0.26em] text-cv-gold/85">{reading.heroLabel}</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-cv-text md:text-6xl">{reading.heroTitle}</h1>
        <p className="mt-5 text-base leading-8 text-cv-text/90 md:text-xl">{reading.heroBody}</p>
        <p className="mt-6 text-sm leading-7 text-cv-faint md:text-base">{reading.passage}</p>
      </Panel>

      {reading.steps.map((step, index) => (
        <Panel key={step.title}>
          <p className="text-[11px] uppercase tracking-[0.26em] text-cv-gold/85">ÉTAPE {index + 1}</p>
          <h2 className="mt-3 font-serif text-3xl text-cv-text md:text-4xl">{step.title}</h2>
          <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base whitespace-pre-line">{step.body}</p>
        </Panel>
      ))}

      <Panel>
        <p className="text-[11px] uppercase tracking-[0.26em] text-cv-gold/85">{reading.bridge.label}</p>
        <h2 className="mt-3 font-serif text-3xl text-cv-text md:text-4xl">{reading.bridge.title}</h2>
        <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base">{reading.bridge.body}</p>
        <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base">{reading.bridge.body2}</p>
        <p className="mt-6 text-sm leading-7 text-cv-faint md:text-base">{reading.bridge.line}</p>
      </Panel>

      <Panel>
        <p className="text-[11px] uppercase tracking-[0.26em] text-cv-gold/85">{reading.session.label}</p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-3xl text-cv-text md:text-4xl">{reading.session.title}</h2>
            <p className="mt-2 text-5xl font-semibold text-cv-gold">{reading.session.price}</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base">{reading.session.body}</p>
        <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base">{reading.session.body2}</p>
        <p className="mt-5 text-sm leading-8 text-cv-muted md:text-base">{reading.session.body3}</p>
        <AnchorButton href={BOOKING_URL} target="_blank" rel="noreferrer" className="mt-6 w-full md:w-auto">
          {reading.session.cta}
        </AnchorButton>
        <p className="mt-4 text-xs leading-6 text-cv-faint">{reading.session.note}</p>
      </Panel>
    </div>
  );
}
