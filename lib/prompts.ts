import type { QuizAnswers } from '@/lib/types';

export function buildFreePrompt(answers: QuizAnswers) {
  return `
Tu écris en français.
Ton ton est premium, net, psychologique, incarné.
Pas de jargon numérologique visible.
Pas de phrases trop longues.
Pas de lyrisme inutile.
Pas de ton oracle.

But : produire un aperçu gratuit de 600 à 700 mots maximum, mobile-friendly, intense mais incomplet.

Structure JSON attendue :
{
  "hero": string,
  "reveal": string,
  "sections": [
    {"title":"Votre mode de protection principal","body":string},
    {"title":"Votre angle mort émotionnel","body":string},
    {"title":"Héritage","body":string},
    {"title":"Valeur et légitimité","body":string},
    {"title":"La vérité à entendre maintenant","body":string},
    {"title":"Votre première bascule","body":string}
  ],
  "locked": {
    "label": "CE QUE VOUS N’AVEZ PAS ENCORE VU",
    "title": "Le vrai nœud n’est pas encore révélé",
    "body": string,
    "body2": string,
    "line": string
  }
}

Données :
- prénom : ${answers.firstName}
- date de naissance : ${answers.birthDate}
- lieu de naissance : ${answers.birthPlace}
- focus actuel : ${answers.currentFocus}
- niveau d'énergie : ${answers.energyState}
- réaction sous stress : ${answers.stressResponse}

Rappels :
- structure courte
- chaque section apporte une couche différente
- laisser sentir que la suite va au point-source
- ne pas refermer la boucle
- écrire comme à une personne intelligente et sensible.
`.trim();
}

export function buildPremiumPrompt(answers: QuizAnswers) {
  return `
Tu écris en français.
Ton ton est premium, net, psychologique, incarné.
Pas de jargon numérologique visible.
Pas de ton oracle.
Pas de redondances.
Pas de phrases trop longues.

But : produire une lecture complète dense, structurée, lisible sur mobile, entre 1700 et 2200 mots.

Structure JSON attendue :
{
  "heroLabel": "LECTURE COMPLÈTE",
  "heroTitle": "Vous êtes allé au-delà du premier seuil",
  "heroBody": string,
  "passage": "Ici, on ne reste plus à la surface. On entre dans la structure.",
  "steps": [
    {"title":"Le verrou principal","body":string},
    {"title":"L’héritage invisible","body":string},
    {"title":"Valeur, légitimité, argent","body":string},
    {"title":"Ce qui cherche à vivre davantage","body":string},
    {"title":"Traversée concrète","body":string},
    {"title":"Questions de confrontation","body":string}
  ],
  "bridge": {
    "label": "ET MAINTENANT",
    "title": "Voir plus clair ne suffit pas toujours à traverser",
    "body": string,
    "body2": string,
    "line": "Passer de la lucidité au mouvement demande parfois un espace tenu, précis, incarné."
  },
  "session": {
    "label": "ACCOMPAGNEMENT PRIVÉ",
    "title": "Séance avec Philippe",
    "price": "97 €",
    "body": "1 h en visio pour travailler l’endroit exact où votre verrou se rejoue aujourd’hui.",
    "body2": string,
    "body3": "Ce n’est pas seulement un décryptage. C’est une première traversée accompagnée.",
    "cta": "Réserver ma séance",
    "note": "La lecture complète est incluse."
  }
}

Données :
- prénom : ${answers.firstName}
- date de naissance : ${answers.birthDate}
- lieu de naissance : ${answers.birthPlace}
- focus actuel : ${answers.currentFocus}
- niveau d'énergie : ${answers.energyState}
- réaction sous stress : ${answers.stressResponse}

Rappels :
- chaque étape doit révéler une couche nouvelle
- la lecture complète doit donner la sensation d’une traversée, pas d’un texte plus long
- rester direct, élégant, psychologique, crédible
- la séance doit apparaître comme la suite naturelle et incarnée.
`.trim();
}
