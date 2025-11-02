export type ChapterContentType = {
  title: string;
  content: string;
  images?: string[];
  contentAfterImages?: string;
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
    cerebro: BrainPartCard,
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
  partesCerebro: {
    cerebro: {
      1: {
        title: "Capítulo 1 - Introdução: o que é o cérebro?",
        content: `Imagine que o seu corpo é como uma orquestra complexa. Quem é o maestro que coordena cada instrumento, cada nota, para criar uma sinfonia perfeita?
Esse maestro é o seu cérebro!
Localizado dentro da sua cabeça, ele é o órgão mais fascinante e complexo do corpo humano, pesando cerca de 1,36kg.
`,
        images: ['c1'],
        contentAfterImages: `O cérebro é, de fato, o **centro de comando** de tudo o que você é e faz. Ele é o responsável por:

- Pensamentos: Desde a ideia mais simples até as teorias mais complexas, tudo nasce e é processado aqui.
- Emoções: A alegria de uma conquista, a tristeza de uma perda, o medo de um perigo – suas emoções são geradas e reguladas por intrincadas redes cerebrais.
- Movimentos: Cada passo, cada gesto, cada palavra que você falamos é orquestrada pelo cérebro, que envia sinais precisos para os músculos.

Sem ele, não seríamos capazes de aprender, amar, criar ou sequer respirar. É a base da nossa consciência e individualidade.

Curiosidades sobre o cérebro:
Embora represente apenas cerca de **5% do peso corporal**, o cérebro é um verdadeiro consumidor de energia! Ele consome aproximadamente **20% de todo o metabolismo do corpo**. Isso significa que, mesmo quando você está apenas pensando ou dormindo, seu cérebro está trabalhando a todo vapor, exigindo uma quantidade impressionante de energia para manter suas bilhões de células ativas.

Outra curiosidade é que, ao contrário do que muitos pensam, o cérebro não é uma **massa homogênea**. Ele é composto por diversas regiões especializadas que trabalham em conjunto, como você verá nos próximos capítulos.
`,
      },
      2: {
        title: "Capítulo 2 - Como o cérebro é organizado?",
        content: `Imagine o seu cérebro como uma cidade incrivelmente movimentada e organizada. Para que tudo funcione em harmonia, essa cidade tem diferentes bairros e sistemas de transporte que se conectam. Nesse sentido, vamos explorar a arquitetura fundamental dessa metrópole que representa o nosso cérebro.

Hemisférios: os dois lados da sua mente
A primeira coisa que notamos ao olhar para o cérebro é que ele é dividido em duas grandes metades, os **hemisférios direito e esquerdo**. Embora pareçam quase idênticos em sua estrutura bruta, eles têm especializações diferentes:

- O **hemisfério esquerdo** é frequentemente associado à **lógica**, à **linguagem** (fala e escrita) e ao **pensamento analítico**. É o lado que nos ajuda a processar informações de forma sequencial e detalhada.
- O hemisfério direito é mais ligado à **criatividade**, **intuição**, **percepção espacial** e **reconhecimento de padrões e rostos**. Ele nos permite ver o quadro geral e compreender contextos.
![c2]`,
        contentAfterImages: `É importante notar que essa é uma simplificação. Ambos os hemisférios **trabalham em conjunto**, comunicando-se constantemente através de uma ponte de fibras nervosas densa chamada **corpo caloso**. É essa comunicação que nos permite realizar tarefas complexas que exigem tanto a lógica quanto a criatividade.

As três partes principais: Cérebro, Cerebelo e Tronco Encefálico
Além dos hemisférios, o cérebro pode ser dividido em três estruturas principais que trabalham em conjunto para manter você funcionando:
![c3]
- Cérebro (ou Telencéfalo): É a maior parte, responsável pelas funções mais complexas como **pensamento, memória, linguagem, percepção e movimento voluntário**. É aqui que os hemisférios estão localizados, cobertos pelo neocórtex, a camada mais externa e evoluída do cérebro.
- Cerebelo: Localizado na parte de trás e inferior do crânio, o cerebelo é o "pequeno cérebro". Ele é crucial para a **coordenação motora, equilíbrio e aprendizado de movimentos**. Pense em andar de bicicleta, tocar um instrumento ou até mesmo manter a postura – o cerebelo está trabalhando para refinar e ajustar esses movimentos.
- Tronco Encefálico: É a base do cérebro, conectando-o à medula espinhal. É uma estrutura vital que controla funções automáticas e essenciais para a vida, como a **respiração, batimentos cardíacos, pressão arterial, sono e vigília**. Ele atua como uma ponte de comunicação, retransmitindo informações entre o cérebro e o resto do corpo.
`,
      },
      3: {
        title: "Capítulo 3 - As principais regiões e suas funções",
        content: `Lobos frontal, parietal, temporal e occipital, além do cerebelo e tronco cerebral.

Seções sugeridas:
- Lobo frontal (planejamento e controle)
- Lobo temporal (memória e audição)
- Lobo parietal (integração sensorial)
- Lobo occipital (visão)
- Cerebelo e tronco cerebral`,
      },
      4: {
        title: "Capítulo 4 – O que são neurônios?",
        content: `Células nervosas: estrutura, tipos e função básica de condução elétrica.

Seções sugeridas:
- Estrutura (dendritos, axônio, soma)
- Tipos (sensoriais, motores, interneurônios)
- Potencial de ação (visão simplificada)`,
      },
      5: {
        title: "Capítulo 5 – Sinapses: quando os neurônios conversam",
        content: `Como neurônios se comunicam por sinais químicos e elétricos.

Seções sugeridas:
- Sinapse química vs. elétrica
- Neurotransmissores (visão geral)
- Potenciação e depressão de longo prazo`,
      },
      6: {
        title: "Capítulo 6 – Plasticidade cerebral: o cérebro que muda",
        content: `Capacidade de adaptação do cérebro ao longo da vida.

Seções sugeridas:
- Aprendizado e memória
- Recuperação pós-lesão
- Neurogênese (onde e quando)`,
      },
      7: {
        title: "Capítulo 7 – Curiosidades e mitos sobre o cérebro",
        content: `Fatos interessantes e correções de mal-entendidos populares.

Seções sugeridas:
- Mito dos 10%
- "Cérebro esquerdo vs. direito"
- Sonhos e criatividade`,
      },
    },
    sistema_limbico: {
      1: {
        title: "Capítulo 1 - Introdução",
        content: `O sistema límbico é conhecido como o "cérebro emocional" e é responsável por processar emoções, memórias e comportamentos instintivos.

Componentes principais:
- Amígdala: processamento de emoções, especialmente medo
- Hipocampo: formação e consolidação de memórias
- Tálamo: retransmissão de informações sensoriais
- Hipotálamo: regulação de funções básicas e hormônios`,
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
      },
    },
  },
  neurotransmissores: {
    dopamina: {
      1: {
        title: "Capítulo 1 - Introdução",
        content: `A dopamina é conhecida como "molécula da recompensa". Ela está relacionada à motivação, aprendizado e prazer.

Funções principais:
- Sistema de recompensa
- Controle motor
- Aprendizado e memória`,
      },
      2: {
        title: "Capítulo 2 - Dopamina e Comportamento",
        content: `A dopamina desempenha papel central no desenvolvimento de vícios. Entender essa relação é essencial para compreender dependências.

Tipos de vícios:
- Substâncias: álcool, nicotina, drogas
- Comportamentais: jogos, redes sociais, compras`,
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
      },
      2: {
        title: "Capítulo 2 – Para que ela serve?",
        content: `A alegria não é apenas uma emoção agradável, mas desempenha funções evolutivas importantes:

Funções da alegria:
- Promove comportamentos sociais positivos
- Facilita a formação de vínculos
- Aumenta a criatividade e resolução de problemas
- Serve como reforço para comportamentos benéficos`,
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
      },
    },
  },
};
