export type QuizAnswers = {
  firstName: string;
  birthDate: string; // JJ/MM/AAAA
  birthPlace: string;
  currentFocus: string;
  energyState: string;
  stressResponse: string;
};

export type FreeSection = {
  title: string;
  body: string;
};

export type FreeReading = {
  hero: string;
  reveal: string;
  sections: FreeSection[];
  locked: {
    label: string;
    title: string;
    body: string;
    body2: string;
    line: string;
  };
};

export type PremiumStep = {
  title: string;
  body: string;
};

export type PremiumReading = {
  heroLabel: string;
  heroTitle: string;
  heroBody: string;
  passage: string;
  steps: PremiumStep[];
  bridge: {
    label: string;
    title: string;
    body: string;
    body2: string;
    line: string;
  };
  session: {
    label: string;
    title: string;
    price: string;
    body: string;
    body2: string;
    body3: string;
    cta: string;
    note: string;
  };
};

export type ReadingRecord = {
  token: string;
  paid: boolean;
  status: 'pending' | 'processing' | 'ready' | 'failed';
  answers: QuizAnswers;
  free: FreeReading;
  premium?: PremiumReading;
  error?: string;
  createdAt: string;
};
