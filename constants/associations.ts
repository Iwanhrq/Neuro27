export type AssociationCategoria = 'emocoes' | 'neurotransmissores' | 'partesCerebro';
export type AssociationItem = {
  emocoes: string[];
  neurotransmissores: string[];
  partesCerebro: string[];
};

export const associations: { [key: string]: AssociationItem } = {
  // Emoções
  emocoes: {
    neurotransmissores: ['dopamina', 'serotonina', 'acetilcolina'],
    partesCerebro: ['sistema_limbico', 'cerebro', 'amigdala'],
    emocoes: [],
  },
  alegria: {
    neurotransmissores: ['dopamina', 'serotonina'],
    partesCerebro: ['sistema_limbico', 'cerebro_emocional'],
    emocoes: [],
  },
  tristeza: {
    neurotransmissores: ['serotonina'],
    partesCerebro: ['amigdala'],
    emocoes: [],
  },
  raiva: {
    neurotransmissores: ['dopamina'],
    partesCerebro: ['amigdala', 'sistema_limbico'],
    emocoes: [],
  },
  medo: {
    neurotransmissores: ['adrenalina'],
    partesCerebro: ['amigdala'],
    emocoes: [],
  },
  amor: {
    neurotransmissores: ['dopamina', 'serotonina'],
    partesCerebro: ['sistema_limbico'],
    emocoes: [],
  },

  // Neurotransmissores
  neurotransmissores: {
    emocoes: ['alegria', 'tristeza', 'raiva', 'medo', 'amor'],
    partesCerebro: ['sistema_limbico', 'cerebro', 'amigdala'],
    neurotransmissores: [],
  },
  dopamina: {
    emocoes: ['alegria'],
    partesCerebro: [],
    neurotransmissores: [],
  },
  serotonina: {
    emocoes: ['alegria', 'tristeza', 'amor'],
    partesCerebro: [],
    neurotransmissores: [],
  },
  acetilcolina: {
    emocoes: ['alegria'],
    partesCerebro: ['cerebro_emocional'],
    neurotransmissores: [],
  },
  adrenalina: {
    emocoes: ['medo', 'raiva'],
    partesCerebro: ['amigdala'],
    neurotransmissores: [],
  },
  gaba: {
    emocoes: ['tristeza'],
    partesCerebro: ['amigdala'],
    neurotransmissores: [],
  },
  glutamato: {
    emocoes: ['alegria'],
    partesCerebro: ['sistema_limbico'],
    neurotransmissores: [],
  },

  // Partes do cérebro
  sistema_limbico: {
    emocoes: ['alegria', 'raiva', 'amor'],
    neurotransmissores: ['dopamina', 'glutamato'],
    partesCerebro: [],
  },
  amigdala: {
    emocoes: ['tristeza', 'raiva', 'medo'],
    neurotransmissores: ['adrenalina', 'gaba'],
    partesCerebro: [],
  },
  cerebro: {
    emocoes: ['alegria'],
    neurotransmissores: ['acetilcolina'],
    partesCerebro: [],
  },
  hipocampo: {
    emocoes: ['tristeza'],
    neurotransmissores: ['serotonina'],
    partesCerebro: [],
  },
};
