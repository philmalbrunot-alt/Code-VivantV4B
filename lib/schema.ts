import { z } from 'zod';

const frenchDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

export const quizAnswersSchema = z.object({
  firstName: z.string().trim().min(1, 'Le prénom est requis.'),
  birthDate: z.string().trim().regex(frenchDateRegex, 'Format attendu : JJ/MM/AAAA'),
  birthPlace: z.string().trim().min(1, 'Le lieu de naissance est requis.'),
  currentFocus: z.string().trim().min(1),
  energyState: z.string().trim().min(1),
  stressResponse: z.string().trim().min(1),
});

export const checkoutPayloadSchema = z.object({
  answers: quizAnswersSchema,
  free: z.any().optional(),
});
