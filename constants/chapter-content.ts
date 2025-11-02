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
![c2Segundo]
- Cérebro (ou Telencéfalo): É a maior parte, responsável pelas funções mais complexas como **pensamento, memória, linguagem, percepção e movimento voluntário**. É aqui que os hemisférios estão localizados, cobertos pelo neocórtex, a camada mais externa e evoluída do cérebro.
- Cerebelo: Localizado na parte de trás e inferior do crânio, o cerebelo é o "pequeno cérebro". Ele é crucial para a **coordenação motora, equilíbrio e aprendizado de movimentos**. Pense em andar de bicicleta, tocar um instrumento ou até mesmo manter a postura – o cerebelo está trabalhando para refinar e ajustar esses movimentos.
- Tronco Encefálico: É a base do cérebro, conectando-o à medula espinhal. É uma estrutura vital que controla funções automáticas e essenciais para a vida, como a **respiração, batimentos cardíacos, pressão arterial, sono e vigília**. Ele atua como uma ponte de comunicação, retransmitindo informações entre o cérebro e o resto do corpo.
`,
      },
      3: {
        title: "Capítulo 3 - As principais regiões e suas funções",
        content: `Nos capítulos anteriores, você aprendeu sobre a organização geral do cérebro. Agora, você irá mergulhar um pouco mais fundo e conhecer os “bairros” especializados que compõem essa cidade neural. O córtex cerebral, a camada mais externa do cérebro, é dividido em quatro lobos principais, cada um com funções cruciais para o nosso dia a dia.

Os quatro lobos do cérebro e o que cada um faz
Para facilitar a compreensão, podemos pensar em cada lobo como um departamento com responsabilidades específicas:
`,
        images: ['c3'],
        contentAfterImages: `Lobo Frontal: o planejador e tomador de decisões
Localizado na parte da frente da cabeça, o **lobo frontal** é o nosso centro de comando executivo. Ele é fundamental para:

- Planejamento e tomada de decisões: Ajuda a organizar pensamentos, prever consequências e fazer escolhas, desde o que você vai almoçar até planos de longo prazo.
- Personalidade e comportamento social: Modula nossa interação com o mundo, controlando impulsos e adaptando nosso comportamento a diferentes situações.
- Movimento voluntário: O córtex motor primário, localizado na parte posterior do lobo frontal, é responsável por iniciar e controlar todos os movimentos conscientes do corpo. 
- Linguagem (produção): A área de Broca, geralmente no lobo frontal esquerdo, é essencial para a produção da fala.
![c3Segundo]

Lobo Parietal: o integrador sensorial
Situado atrás do lobo frontal, o **lobo parietal** é o grande integrador de informações sensoriais. Suas principais funções incluem:

- Processamento sensorial: Recebe e interpreta informações do tato (pressão, temperatura, dor), paladar e propriocepção (percepção da posição do corpo no espaço).
- Navegação espacial: Ajuda a nos orientar no ambiente e a entender a relação entre os objetos e nosso corpo.
- Atenção: Desempenha um papel importante na capacidade de focar em estímulos específicos.
![c3Terceiro]

Lobo Temporal: a central da audição e memória
Localizado nas laterais da cabeça, abaixo do lobo parietal, o **lobo temporal** é essencial para a audição e a memória. Entre suas funções estão:

- Processamento auditivo: recebe e interpreta sons, permitindo-nos compreender a linguagem falada e a apreciar a música.
- Memória: O hipocampo, uma estrutura profunda dentro do lobo temporal, é crucial para a formação de novas memórias.
- Reconhecimento de faces e objetos: Ajuda a identificar o que vemos e a associá-lo a informações armazenadas.
- Linguagem (compreensão): A área de Wernicke, geralmente no lobo temporal esquerdo, é fundamental para a compreensão da linguagem.
![c3Quarto]

Lobo Occipital: o centro da visão
Na parte de trás da cabeça, o **lobo occipital** é quase que inteiramente dedicado ao processamento visual.

- Processamento visual: Recebe e interpreta as informações visuais enviadas pelos olhos, permitindo-nos enxergar formas, cores, movimentos e profundidade.
![c3Quinto]

Como as regiões se comunicam e se equilibram
É importante ressaltar que essas regiões **não trabalham isoladamente**. Elas estão em constante comunicação, trocando informações através de vastas redes neurais. Por exemplo, quando você decide pegar uma xícara de café:

- Seu **lobo frontal** planeja o movimento.
- O **lobo parietal** usa informações sensoriais para guiar sua mão.
- O **lobo occipital** processa a imagem da xícara.
- O **lobo temporal** pode evocar a memória do sabor do café.

Essa orquestração complexa e equilibrada é o que nos permite interagir com o mundo de forma fluida e eficiente. Qualquer desequilíbrio ou dano em uma dessas regiões pode afetar significativamente as funções associadas, destacando a interdependência de todas as partes do nosso cérebro.

`,
      },
      4: {
        title: "Capítulo 4 – O que são neurônios?",
        content: `Se o cérebro é a cidade, os **neurônios** são os seus moradores mais importantes: as células especializadas que fazem toda a comunicação acontecer. Eles são a base de tudo o que pensamos, sentimos e fazemos. 
`,
        images: ['c4'],
        contentAfterImages: `Células Nervosas: o que são e por que são tão especiais
     Os neurônios são as **células nervosas** do nosso corpo, e são únicas em sua capacidade de processar e transmitir informações. Ao contrário da maioria das nossas células que são mais arredondadas, os neurônios possuem uma estrutura peculiar, com “galhos” que se estendem, permitindo-lhes formar uma rede complexa.
     O que os torna tão especiais é a sua função principal: **comunicar**. Eles são os mensageiros do nosso sistema nervoso, capazes de enviar sinais rapidamente por longas distâncias. Essa habilidade é fundamental para coordenar todas as atividades do nosso corpo, desde um simples reflexo até o raciocínio mais complexo.

Como enviam e recebem mensagens elétricas
A comunicação entre neurônios é um processo eletroquímico. Pense neles como pequenos fios elétricos que transmitem informações. Os neurônios enviam mensagens na forma de **impulsos elétricos**, chamados **potenciais de ação**. Esse processo geralmente funciona assim:

- Recebimento: Um neurônio recebe sinais de outros neurônios através de estruturas chamadas **dendritos**.
- Processamento: Se os sinais recebidos forem fortes o suficiente, o neurônio gera um impulso elétrico.
- Transmissão: Esse impulso elétrico viaja rapidamente ao longo de uma extensão longa do neurônio, o **axônio**.
- Envio: Ao chegar ao final do axônio, o impulso elétrico provoca a liberação de substâncias químicas, os **neurotransmissores**, que atravessam um pequeno espaço para o próximo neurônio (falaremos mais sobre isso depois).
![c4Segundo]
Essa “conversa” elétrica e química é a base de todas as nossas funções cerebrais.

Quantos neurônios temos (e o que isso significa)
     O cérebro humano contém cerca de **100 bilhões de neurônios.** Para colocar isso em perspectiva, é aproximadamente a mesma quantidade de estrelas na Via Láctea! E cada um desses neurônios pode fazer cerca de **10 mil conexões** com outros neurônios, resultando em aproximadamente um **quatrilhão de conexões.**
	   O que isso significa? Significa que seu cérebro é uma máquina de processamento de informações incrivelmente poderosa e complexa. Essa vasta rede de neurônios e suas conexões é o que nos permite aprender, memorizar, raciocinar, sentir emoções e interagir com o mundo de maneiras infinitamente variadas. É a riqueza dessas conexões que dá ao nosso cérebro sua capacidade adaptativa e sua complexidade inigualável.
`,
      },
      5: {
        title: "Capítulo 5 – Sinapses: quando os neurônios conversam",
        content: `Se os neurônios são os mensageiros do nosso cérebro, as **sinapses** são os pontos de encontro onde essa conversa acontece. É nesses pequenos espaços que a mágica da comunicação neural se desenrola, permitindo que as informações fluam e que você pense, sinta e aja. Vamos entender como essa comunicação essencial ocorre.

O que é uma sinapse e como ocorre a comunicação entre neurônios
Uma **sinapse** é a junção especializada onde um neurônio transmite um sinal para outro neurônio, ou para uma célula-alvo (como uma célula muscular ou glandular). Pense nela como uma ponte minúscula, mas incrivelmente eficiente, entre duas células nervosas.
`,
        images: ['c5'],
        contentAfterImages: `- Chegada do Impulso Elétrico: Quando um impulso elétrico (potencial de ação) chega ao final do axônio do neurônio transmissor (chamado neurônio pré-sináptico), ele desencadeia uma série de eventos.
- Geração de Novo Sinal: Quando os neurotransmissores se ligam aos receptores, eles podem gerar um novo impulso elétrico no neurônio pós-sináptico, ou inibir sua atividade, dependendo do tipo de neurotransmissor e receptor envolvidos.
Esse processo é incrivelmente rápido e preciso, ocorrendo milhares de vezes por segundo em todo o seu cérebro.

Neurotransmissores: mensageiros químicos que levam as informações
Os **neurotransmissores** são as chaves químicas que abrem as portas da comunicação neural. Existem diversos tipos, e cada um tem um papel específico, influenciando diferentes aspectos do nosso humor, comportamento e funções corporais. Alguns dos mais conhecidos, que você irá se aprofundar depois, são:

- Dopamina: Associada ao prazer, recompensa, motivação e movimento. É fundamental para a sensação de bem-estar.
- Serotonina: Regula o humor, sono, apetite e bem-estar geral. Níveis baixos desse neurotransmissor estão relacionados à depressão e ansiedade.
- GABA (Ácido Gama-aminobutírico): O principal neurotransmissor inibitório, acalmando a atividade cerebral e reduzindo a ansiedade.

O equilíbrio entre esses mensageiros químicos é essencial para o funcionamento saudável do cérebro. Medicamentos que tratam condições neurológicas e psiquiátricas frequentemente atuam modulando a ação dos neurotransmissores.

Exemplo prático: quando sentimos alegria, medo ou tomamos uma decisão
Para entender o impacto das sinapses e dos neurotransmissores no seu dia a dia, vamos a alguns exemplos:

- Sentir alegria: Quando você recebe uma boa notícia ou comer algo delicioso, neurônios em áreas de recompensa do seu cérebro liberam **dopamina** nas sinapses. Essa liberação cria a sensação de prazer e incentiva você a buscar fazer essa experiência novamente.
- Sentir medo: Ao se deparar com uma situação perigosa, como um susto inesperado, uma cascata de neurotransmissores como a **noradrenalina** é liberada rapidamente. Isso prepara seu corpo para a reação de "luta ou fuga", aumentando a frequência cardíaca, a atenção e a tensão muscular.
- Tomar uma decisão: A tomada de decisão é um processo complexo que envolve a interação de muitos neurônios e neurotransmissores, especialmente no lobo frontal. Neurônios trocam informações através de sinapses, pesando prós e contras, evocando memórias e antecipando resultados. O **glutamato** e o **GABA** trabalham em conjunto para excitar e inibir diferentes circuitos, permitindo que uma decisão seja "finalizada" e executada.

Esses exemplos ilustram como a comunicação sináptica é a base de todas as nossas experiências e interações com o mundo, moldando quem somos e como reagimos.
`,
      },
      6: {
        title: "Capítulo 6 – Plasticidade cerebral: o cérebro que muda",
        content: `Ao contrário do que você pensava antigamente, o cérebro não é uma estrutura fixa e imutável após a infância. Na verdade, ele é incrivelmente dinâmico e capaz de se reorganizar ao longo de toda a vida. Esse fenômeno extraordinário é conhecido como **plasticidade cerebral** (ou **neuroplasticidade**), e é a chave para a nossa capacidade de aprender, adaptar e até mesmo se recuperar de lesões.

Explicação simples do que é plasticidade
     A plasticidade cerebral é a capacidade do cérebro de **mudar sua estrutura e função** em resposta a experiências, aprendizados, ambiente e até mesmo a danos. Imagine seu cérebro como uma cidade com muitas estradas e caminhos. A plasticidade é a habilidade dessa cidade de construir novas estradas, alargar as existentes, fechar as que não são mais usadas e até mesmo desviar o tráfego para novas rotas quando uma estrada principal é bloqueada.
     Essa capacidade de reorganização ocorre em diversos níveis, desde a modificação da força das conexões entre neurônios (sinapses) até a formação de novos neurônios em certas regiões.

Como o cérebro aprende, se adapta e recupera
A plasticidade cerebral é o motor por trás de muitas de nossas habilidades:

- Aprendizado: Cada vez que você aprende algo novo – seja um idioma, uma nova habilidade motora (como andar de bicicleta ou tocar um instrumento) ou um conceito complexo – seu cérebro está ativamente mudando. Novas conexões sinápticas são formadas e as existentes são fortalecidas, um processo muitas vezes resumido pela frase “neurônios que disparam juntos, conectam-se juntos".
- Adaptação: O cérebro se adapta constantemente ao ambiente. Por exemplo, se você se muda para um lugar com um sotaque diferente, seu cérebro se ajusta para compreender melhor a fala. Da mesma forma, em sistemas sensoriais, o cérebro pode se adaptar a estímulos repetidos (habituação) ou aumentar sua sensibilidade a outros (sensibilização). Essa adaptação também é crucial para a formação de hábitos, onde ações repetidas se tornam mais automáticas à medida que os circuitos neurais envolvidos são reforçados.
- Recuperação: Após uma lesão cerebral, como um derrame, a plasticidade permite que outras áreas do cérebro assumam as funções das regiões danificadas. mbora a recuperação possa ser um processo longo e desafiador, a capacidade do cérebro de se reorganizar é o que possibilita a reabilitação e a recuperação de habilidades perdidas. Em alguns casos, a neurogênese (nascimento de novos neurônios) em áreas como o hipocampo também contribui para a recuperação e o aprendizado contínuo.

Exemplos práticos: aprender algo novo, superar traumas e desenvolver hábitos
- Aprender algo novo: Quando você começa a aprender a tocar violão, seus dedos e seu cérebro trabalham juntos para criar novas rotas neurais que permitem a coordenação e a memorização dos acordes. Com a prática, essas rotas se tornam mais eficientes, e o que antes era difícil se torna natural.
- Desenvolver hábitos: Seja um bom hábito (como exercitar-se regularmente) ou um mau (como roer as unhas), a repetição de comportamentos reforça os circuitos neurais envolvidos. Com o tempo, essas ações se tornam automáticas, exigindo menos esforço consciente. A compreensão da plasticidade nos ajuda a quebrar hábitos indesejados e a construir novos, mais saudáveis
`,
        images: ['c6'],
        contentAfterImages: `- Superar traumas: Pessoas que vivenciam experiências traumáticas podem desenvolver respostas de medo intensas. A terapia, através da plasticidade, ajuda o cérebro a reprocessar essas memórias, enfraquecendo as conexões neurais associadas ao medo e fortalecendo as que promovem a segurança e o controle.
![c6Segundo]
`,
      },
      7: {
        title: "Capítulo 7 – Curiosidades e mitos sobre o cérebro",
        content: `O cérebro é um órgão tão complexo e fascinante que, naturalmente, ….
        
Usamos só dez porcento do cérebro? Mito!
     Essa é, talvez, uma das maiores e mais persistentes lendas urbanas sobre o cérebro: a ideia de que utilizamos apenas uma pequena fração da nossa capacidade cerebral, geralmente citada como 10%. A verdade é que **usamos 100% do nosso cérebro!**
	   Estudos de neuroimagem, como a ressonância magnética funcional (fMRI), mostram que todas as áreas do cérebro estão ativas em algum momento, mesmo durante atividades simples como descansar ou dormir. Diferentes regiões são mais ativadas dependendo da tarefa, mas nenhuma parte do cérebro fica completamente inativa. Pensar, sentir, enxergar, planejar, lembrar – tudo isso requer a orquestração de múltiplas áreas cerebrais trabalhando em conjunto. Se 90% do nosso cérebro fosse inútil, uma lesão em qualquer uma dessas áreas "não utilizadas" não teria consequências, o que sabemos que não é verdade.

Diferenças entre o cérebro masculino e feminino
    Outro tópico que gera debates e equívocos são as supostas diferenças entre o cérebro masculino e feminino. Embora existam algumas **diferenças estruturais e funcionais médias** entre os cérebros de homens e mulheres, é crucial entender que essas diferenças são sutis e não determinam capacidades ou inteligência.
	  Por exemplo, algumas pesquisas sugerem que o cérebro masculino pode ser, em média, ligeiramente maior em volume total, enquanto o feminino pode ter uma maior densidade de conexões em certas regiões. 
    Há também a hipótese de que o cérebro masculino tende a ser mais lateralizado (com funções mais concentradas em um hemisfério), enquanto o feminino pode apresentar uma maior comunicação entre os hemisférios. No entanto, essas são médias estatísticas e há uma vasta sobreposição entre os indivíduos. As diferenças são muito mais relacionadas a nuances na forma como as informações são processadas e não a uma superioridade de um sobre o outro. Estereótipos de gênero sobre habilidades cognitivas raramente são apoiados por evidências científicas robustas e ignoram a vasta variabilidade individual.

Fatos curiosos: sonhos, memória e criatividade
- Sonhos: Os sonhos são experiências misteriosas que ocorrem principalmente durante a fase REM (Rapid Eye Movement) do sono. Embora sua função exata ainda seja objeto de estudo, teorias sugerem que os sonhos podem estar envolvidos na **consolidação da memória,** no **processamento emocional** e na **resolução de problemas.** Eles são vívidos, muitas vezes ilógicos, e podem ser uma forma do cérebro de ensaiar situações, integrar novas informações ou simplesmente limpar e organizar dados. Curiosamente, a atividade cerebral durante o sono REM é bastante semelhante à atividade cerebral quando estamos acordados.
- Memória: A memória não é um único "arquivo" no cérebro, mas um sistema complexo com diferentes tipos e processos. Temos a memória de curto prazo (ou memória operacional), que nos permite reter poucas informações por um breve período (como um número de telefone antes de discar), e a memória de longo prazo, que armazena informações por dias, anos ou a vida toda [1]. A formação de memórias envolve o fortalecimento de conexões sinápticas (plasticidade!) e a interação de várias regiões cerebrais, como o hipocampo para a consolidação e o córtex pré-frontal para a memória operacional e episódica. A capacidade de lembrar e esquecer é crucial para nossa adaptabilidade e aprendizado.
- Criatividade: A criatividade, a capacidade de gerar ideias novas e úteis, é uma das habilidades mais valorizadas do cérebro humano. Ela não reside em uma única área, mas emerge da interação dinâmica de múltiplas redes cerebrais, incluindo as envolvidas na memória, atenção, tomada de decisão e processamento emocional. A criatividade muitas vezes envolve a habilidade de fazer conexões inesperadas entre informações aparentemente não relacionadas, um processo que pode ser facilitado por estados de relaxamento e até mesmo pelo sono. É um testemunho da capacidade do cérebro de ir além do que é conhecido e construir o novo.

`,
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
