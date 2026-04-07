import type { FreeReading, PremiumReading, QuizAnswers } from '@/lib/types';

function focusLine(answers: QuizAnswers) {
  switch (answers.currentFocus) {
    case 'Je me sens bloqué(e), comme si je tournais en rond':
      return 'Vous sentez qu’une part de vous veut avancer, mais qu’une autre maintient le frein au moment même où il faudrait trancher.';
    case 'Je traverse une période de changement ou de doute':
      return 'Vous êtes dans un entre-deux. Ce qui était soutenable hier ne suffit plus, mais le prochain cap n’est pas encore totalement assumé.';
    case 'Je veux mieux me comprendre, en profondeur':
      return 'Vous cherchez moins un conseil qu’un diagnostic juste. Le besoin ici n’est pas de vous motiver. C’est de voir clair.';
    case 'Mes relations m’épuisent ou me questionnent':
      return 'Le rapport au lien semble ici central. Ce qui vous touche n’est pas seulement ce que l’autre fait, mais ce que cela réveille de plus ancien.';
    default:
      return 'La curiosité n’est pas neutre. Si vous êtes ici, c’est qu’une part de vous sent déjà que quelque chose doit être lu autrement.';
  }
}

function protectionLine(answers: QuizAnswers) {
  switch (answers.stressResponse) {
    case 'Je me replie et je disparais un peu':
      return 'Votre mode de protection principal semble être le retrait. Vous réduisez votre exposition pour garder la main sur ce qui pourrait vous atteindre.';
    case 'Je suranalyse tout':
      return 'Votre mode de protection principal semble être le surcontrôle mental. Vous cherchez à comprendre davantage pour ne pas avoir à vous exposer trop vite.';
    case 'Je m’occupe des autres pour éviter de me regarder':
      return 'Votre mode de protection principal semble être le déplacement. Vous gardez votre valeur du côté de l’utilité pour éviter d’affronter ce qui vous concerne directement.';
    case 'Je deviens irritable ou sec':
      return 'Votre mode de protection principal semble être la dureté défensive. Vous créez de la distance au moment même où quelque chose de plus vulnérable voudrait être reconnu.';
    default:
      return 'Votre mode de protection principal semble être la façade. Vous continuez à tenir, même quand l’intérieur demande autre chose.';
  }
}

export function buildFreeFallback(answers: QuizAnswers): FreeReading {
  return {
    hero: `${answers.firstName}, vous ne manquez pas de lucidité. Vous retenez encore quelque chose de plus central que vous ne le croyez.`,
    reveal: focusLine(answers),
    sections: [
      {
        title: 'Votre mode de protection principal',
        body: protectionLine(answers),
      },
      {
        title: 'Votre angle mort émotionnel',
        body: 'Votre angle mort ne semble pas être le manque de perception. Il semble plutôt se situer dans la manière dont vous amortissez votre vérité pour rester lisible, correct ou maîtrisé.',
      },
      {
        title: 'Héritage',
        body: 'Il y a probablement une vieille fidélité au fait de contenir, de ne pas trop déranger, ou de mériter sa place par la tenue plutôt que par l’élan.',
      },
      {
        title: 'Valeur et légitimité',
        body: 'Le sujet n’est pas seulement la confiance. Il touche au droit de prendre plus de place, demander plus clairement, et exister sans compensation permanente.',
      },
      {
        title: 'La vérité à entendre maintenant',
        body: 'Ce qui vous freine ne tient pas seulement à la peur. Cela tient aussi à une forme de correction devenue identité. Tant que cela reste noble à vos yeux, cela continue de vous limiter.',
      },
      {
        title: 'Votre première bascule',
        body: 'Nommez plus clairement ce que vous voulez, sans préparer trop longtemps votre entrée. Une demande, une limite ou une décision peut déjà fissurer l’ancien schéma.',
      },
    ],
    locked: {
      label: 'CE QUE VOUS N’AVEZ PAS ENCORE VU',
      title: 'Le vrai nœud n’est pas encore révélé',
      body: 'Le verrou principal n’est pas celui que vous montrez. Il est plus discret et plus ancien. Il touche à votre droit d’exister sans surcontrôle, sans compensation, sans devoir mériter votre place en vous retenant.',
      body2: 'Tant que ce point reste invisible, vous avancerez par correction plus que par élan. La suite va là où votre tension prend sa source… et là où elle peut enfin commencer à céder.',
      line: 'La lecture complète révèle le verrou principal, la peur racine, le rapport à la légitimité, l’élan retenu et la direction de bascule la plus juste.',
    },
  };
}

export function buildPremiumFallback(answers: QuizAnswers): PremiumReading {
  return {
    heroLabel: 'LECTURE COMPLÈTE',
    heroTitle: 'Vous êtes allé au-delà du premier seuil',
    heroBody:
      'Ce qui suit ne tourne plus autour du mécanisme visible. Cette lecture relie le verrou central, l’héritage invisible, le rapport à la valeur, l’élan retenu et le point de bascule le plus juste.',
    passage: 'Ici, on ne reste plus à la surface. On entre dans la structure.',
    steps: [
      {
        title: 'Le verrou principal',
        body: `${answers.firstName}, le verrou principal n’est pas un simple manque d’audace. Il ressemble davantage à une protection devenue normalité. Vous avez probablement appris à tenir avant d’apprendre à vous montrer. Tant que cette logique reste active, vous avancez avec prudence même quand la situation demanderait plus de netteté.`
      },
      {
        title: 'L’héritage invisible',
        body: 'Ce qui se rejoue ici semble toucher à une fidélité ancienne. Il peut s’agir de contenir, de ne pas déranger, de rester correct, ou de ne prendre sa place qu’à condition de la justifier. Ce type d’héritage ne se voit pas toujours dans les grands récits familiaux. Il se sent surtout dans l’atmosphère intérieure.',
      },
      {
        title: 'Valeur, légitimité, argent',
        body: 'Le rapport à la valeur n’est pas seulement matériel. Il parle du droit d’être vu, demandé, choisi, payé, reconnu. Tant que la légitimité dépend d’une sur-préparation ou d’une compensation, la matière reste en retrait.',
      },
      {
        title: 'Ce qui cherche à vivre davantage',
        body: 'Ce qui pousse ici ne cherche pas forcément plus d’analyse. Cela cherche plus de présence, plus de décision, plus d’incarnation. Une part de vous sait déjà où elle doit moins se retenir.',
      },
      {
        title: 'Traversée concrète',
        body: 'Le premier mouvement n’est pas spectaculaire. Il est précis. Dire plus clairement. Demander sans détour. Refuser sans surjustification. Nommer ce que vous ne voulez plus amortir. C’est souvent à cet endroit que la structure commence à céder.',
      },
      {
        title: 'Questions de confrontation',
        body: 'Où continuez-vous à appeler prudence ce qui relève surtout de la retenue ? Où méritez-vous encore votre place en vous suradaptant ? Et que se passerait-il si vous cessiez de compenser pour simplement occuper votre position ?',
      },
    ],
    bridge: {
      label: 'ET MAINTENANT',
      title: 'Voir plus clair ne suffit pas toujours à traverser',
      body: 'Ce que vous venez de lire met une structure en lumière. Mais certaines retenues ne cèdent pas simplement parce qu’on les comprend. Elles se rejouent dans vos choix, votre parole, votre rapport à la valeur, votre manière de prendre place, de décider, d’aimer ou de vous exposer.',
      body2: 'La séance privée permet de travailler l’endroit exact où cela reste vivant aujourd’hui. Pas pour ajouter une couche d’analyse. Pour commencer à remettre du mouvement là où quelque chose en vous se retient encore.',
      line: 'Passer de la lucidité au mouvement demande parfois un espace tenu, précis, incarné.',
    },
    session: {
      label: 'ACCOMPAGNEMENT PRIVÉ',
      title: 'Séance avec Philippe',
      price: '97 €',
      body: '1 h en visio pour travailler l’endroit exact où votre verrou se rejoue aujourd’hui.',
      body2: 'Nous partons de votre lecture complète pour voir clair dans ce qui vous retient encore, remettre en mouvement ce qui s’est figé, et clarifier un prochain cap plus juste, plus vivant, plus incarné.',
      body3: 'Ce n’est pas seulement un décryptage. C’est une première traversée accompagnée.',
      cta: 'Réserver ma séance',
      note: 'La lecture complète est incluse.',
    },
  };
}
