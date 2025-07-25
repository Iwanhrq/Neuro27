export type AssociationCategoria = 'emocoes' | 'neurotransmissores' | 'partesCerebro';
export type AssociationItem = {
  emocoes: string[];
  neurotransmissores: string[];
  partesCerebro: string[];
};

export const associations: { [key: string]: AssociationItem } = {
  // Emoções
  alegria: {
    neurotransmissores: ['dopamina', 'serotonina'],
    partesCerebro: ['sistema_limbico', 'cerebro_emocional'],
    emocoes: [], // pode deixar vazio
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

  // Neurotransmissores
  dopamina: {
    emocoes: ['alegria', 'raiva'],
    partesCerebro: ['sistema_limbico'],
    neurotransmissores: [],
  },
  serotonina: {
    emocoes: ['alegria', 'tristeza'],
    partesCerebro: [],
    neurotransmissores: [],
  },

  // Partes do cérebro
  sistema_limbico: {
    emocoes: ['alegria', 'raiva'],
    neurotransmissores: ['dopamina'],
    partesCerebro: [],
  },
  amigdala: {
    emocoes: ['tristeza', 'raiva'],
    neurotransmissores: [],
    partesCerebro: [],
  },
  cerebro_emocional: {
    emocoes: ['alegria'],
    neurotransmissores: [],
    partesCerebro: [],
  },
};
