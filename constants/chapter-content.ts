export type ChapterContentType = {
  title: string;
  content: string;
  quiz: { question: string; options: string[]; answer: string }[];
};

// Importar componentes para o mapeamento
import BrainPartCard from '../components/BrainPartCard';
import EmotionCard from '../components/EmotionCard';
import NeurotransmitterCard from '../components/NeurotransmitterCard';

// Mapeamento de componentes por categoria e tipo
export const componentMapping: {
  [categoria: string]: {
    [tipo: string]: React.ComponentType<any>;
  };
} = {
  neurotransmissores: {
    dopamina: NeurotransmitterCard,
    serotonina: NeurotransmitterCard,
    acetilcolina: NeurotransmitterCard,
    adrenalina: NeurotransmitterCard,
    gaba: NeurotransmitterCard,
    glutamato: NeurotransmitterCard,
    neurotransmissores: NeurotransmitterCard,
  },
  emocoes: {
    alegria: EmotionCard,
    tristeza: EmotionCard,
    raiva: EmotionCard,
    medo: EmotionCard,
    amor: EmotionCard,
    emocoes: EmotionCard,
  },
  partesCerebro: {
    cerebro_emocional: BrainPartCard,
    sistema_limbico: BrainPartCard,
    amigdala: BrainPartCard,
    hipocampo: BrainPartCard,
  },
};

// Objeto completo de conteúdos
export const contents: {
  [categoria: string]: {
    [tipo: string]: {
      [chapterId: number]: ChapterContentType;
    };
  };
} = {
  neurotransmissores: {
    dopamina: {
      1: {
        title: "Capítulo 1 - Introdução",
        content: `A dopamina é conhecida como "molécula da recompensa". Ela está relacionada à motivação, aprendizado e prazer.
  
  Funções principais:
  - Sistema de recompensa
  - Controle motor
  - Aprendizado e memória`,
        quiz: [
          {
            question: "A dopamina é conhecida como:",
            options: [
              "Molécula da memória",
              "Molécula da recompensa",
              "Molécula do sono",
              "Molécula da dor",
            ],
            answer: "Molécula da recompensa",
          },
          {
            question: "Qual via dopaminérgica está relacionada ao controle motor?",
            options: [
              "Via Mesolímbica",
              "Via Mesocortical",
              "Via Nigroestriatal",
              "Via Tuberoinfundibular",
            ],
            answer: "Via Nigroestriatal",
          },
        ],
      },
      2: {
        title: "Capítulo 2 - Dopamina e Comportamento",
        content: `A dopamina desempenha papel central no desenvolvimento de vícios. Entender essa relação é essencial para compreender dependências.
  
  Tipos de vícios:
  - Substâncias: álcool, nicotina, drogas
  - Comportamentais: jogos, redes sociais, compras`,
        quiz: [
          {
            question: "O que acontece com a dopamina em vícios?",
            options: [
              "Diminui drasticamente",
              "Liberação excessiva",
              "Não é afetada",
              "Fica bloqueada",
            ],
            answer: "Liberação excessiva",
          },
        ],
      },
    },
    serotonina: {
      1: {
        title: "Capítulo 1 - Introdução",
        content: `A serotonina é fundamental para bem-estar emocional, sono e apetite.
  
  Funções principais:
  - Regulação do humor
  - Controle do sono
  - Controle do apetite`,
        quiz: [
          {
            question: "A serotonina é conhecida como:",
            options: [
              "Hormônio do estresse",
              "Hormônio da felicidade",
              "Hormônio do crescimento",
              "Hormônio do sono",
            ],
            answer: "Hormônio da felicidade",
          },
        ],
      },
    },
  },
  emocoes: {
    alegria: {
      1: {
        title: "Capítulo 1 – Introdução: o que é a alegria?",
        content: `A alegria é uma emoção positiva fundamental para o bem-estar humano. Envolve a liberação de dopamina, serotonina e endorfinas, criando uma sensação de prazer e satisfação.
  
  Benefícios da alegria:
  - Fortalece o sistema imunológico
  - Reduz os níveis de estresse
  - Melhora a qualidade do sono
  - Aumenta a resiliência emocional`,
        quiz: [
          {
            question: "Qual neurotransmissor está mais associado à alegria?",
            options: ["GABA", "Dopamina", "Glutamato", "Adrenalina"],
            answer: "Dopamina",
          },
          {
            question: "A alegria pode fortalecer o sistema imunológico?",
            options: ["Verdadeiro", "Falso"],
            answer: "Verdadeiro",
          },
        ],
      },
      2: {
        title: "Capítulo 2 – Para que ela serve?",
        content: `A alegria não é apenas uma emoção agradável, mas desempenha funções evolutivas importantes:
  
  Funções da alegria:
  - Promove comportamentos sociais positivos
  - Facilita a formação de vínculos
  - Aumenta a criatividade e resolução de problemas
  - Serve como reforço para comportamentos benéficos`,
        quiz: [
          {
            question: "A alegria facilita a formação de vínculos sociais?",
            options: ["Sim", "Não"],
            answer: "Sim",
          },
        ],
      },
    },
    tristeza: {
      1: {
        title: "Capítulo 1 - Introdução",
        content: `A tristeza é uma emoção natural e necessária para o processamento de perdas e mudanças. Embora seja desagradável, tem funções adaptativas importantes.
  
  Funções da tristeza:
  - Processamento de perdas
  - Sinalização de necessidade de apoio
  - Reflexão sobre mudanças necessárias
  - Preparação para novos ciclos`,
        quiz: [
          {
            question: "A tristeza tem funções adaptativas?",
            options: ["Sim", "Não"],
            answer: "Sim",
          },
        ],
      },
    },
  },
  partesCerebro: {
    sistema_limbico: {
      1: {
        title: "Capítulo 1 - Introdução",
        content: `O sistema límbico é conhecido como o "cérebro emocional" e é responsável por processar emoções, memórias e comportamentos instintivos.
  
  Componentes principais:
  - Amígdala: processamento de emoções, especialmente medo
  - Hipocampo: formação e consolidação de memórias
  - Tálamo: retransmissão de informações sensoriais
  - Hipotálamo: regulação de funções básicas e hormônios`,
        quiz: [
          {
            question: "Qual estrutura é responsável pelo medo?",
            options: ["Hipocampo", "Amígdala", "Tálamo", "Hipotálamo"],
            answer: "Amígdala",
          },
          {
            question: "O hipocampo é responsável por:",
            options: ["Processamento de emoções", "Formação de memórias", "Controle motor", "Regulação hormonal"],
            answer: "Formação de memórias",
          },
        ],
      },
      2: {
        title: "Capítulo 2 - Estruturas do Sistema Límbico",
        content: `Cada estrutura do sistema límbico tem funções específicas e interconectadas:
  
  Amígdala:
  - Detecção de ameaças
  - Processamento de emoções negativas
  - Formação de memórias emocionais
  
  Hipocampo:
  - Conversão de memória de curto para longo prazo
  - Navegação espacial
  - Formação de novas memórias`,
        quiz: [
          {
            question: "A amígdala é responsável pela detecção de ameaças?",
            options: ["Sim", "Não"],
            answer: "Sim",
          },
        ],
      },
    },
    amigdala: {
      1: {
        title: "Capítulo 1 - Introdução",
        content: `A amígdala é uma estrutura pequena mas crucial localizada no lobo temporal. É o centro de processamento emocional do cérebro.
  
  Funções principais:
  - Detecção de ameaças e perigos
  - Processamento de emoções, especialmente medo
  - Formação de memórias emocionais
  - Resposta de luta ou fuga`,
        quiz: [
          {
            question: "A amígdala está localizada em qual lobo?",
            options: ["Frontal", "Temporal", "Parietal", "Occipital"],
            answer: "Temporal",
          },
        ],
      },
    },
    hipocampo: {
      1: {
        title: "Capítulo 1 - Introdução",
        content: `O hipocampo é essencial para a formação de novas memórias e navegação espacial. Tem formato de cavalo-marinho.
  
  Funções principais:
  - Formação de memórias declarativas
  - Navegação espacial
  - Consolidação de memórias
  - Conexão entre memória e emoção`,
        quiz: [
          {
            question: "O hipocampo tem formato de:",
            options: ["Cavalo-marinho", "Coração", "Círculo", "Triângulo"],
            answer: "Cavalo-marinho",
          },
        ],
      },
    },
  },
};
