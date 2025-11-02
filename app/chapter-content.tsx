import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRoute } from "@react-navigation/native";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cerebro1 from '../assets/images/cerebroc1.png';
import estruturaNeuronal from '../assets/images/estruturaNeuronal.png';
import frontal from '../assets/images/frontal.png';
import hemisferio from '../assets/images/hemisferio.png';
import lobos from '../assets/images/lobos.png';
import neuronio from '../assets/images/neuronio.png';
import occipital from '../assets/images/occipital.png';
import parietal from '../assets/images/parietal.png';
import sinapse from '../assets/images/sinapse.png';
import temporal from '../assets/images/temporal.png';
import tronco from '../assets/images/tronco.png';
import formacaoHabito from '../assets/images/formaHabito.png';
import enfraquecendoHabito from '../assets/images/enfraqueceHabito.png';
import { ChapterCompleteButton } from "../components";
import { AssociationCategoria, AssociationItem, associations } from "../constants/associations";
import { ChapterContentType, contents } from "../constants/chapter-content";
import { useChapterProgressContext } from "../contexts/ChapterProgressContext";

// ============================================================================
// CONSTANTES E REGISTRIES
// ============================================================================

/**
 * Registry de imagens: mapeia chaves de texto para as imagens importadas
 * 
 * Quando você escreve ![c4Segundo] no conteúdo, busca "c4Segundo" aqui
 * e encontra a imagem correspondente (frontal.png neste caso)
 */
const IMAGE_REGISTRY: Record<string, any> = {
  // Capítulo 1 - Introdução: o que é o cérebro?
  c1: cerebro1,
  
  // Capítulo 2 - Como o cérebro é organizado?
  c2: hemisferio,
  c2Segundo: tronco, // Segunda imagem do capítulo 2 (tronco encefálico)
  
  // Capítulo 3 - As principais regiões e suas funções
  c3: lobos, // Imagem dos lobos (primeira imagem)
  c3Segundo: frontal, // Lobo frontal
  c3Terceiro: parietal, // Lobo parietal
  c3Quarto: temporal, // Lobo temporal
  c3Quinto: occipital, // Lobo occipital
  
  // Capítulo 4 - O que são neurônios?
  c4: neuronio, // Neurônio
  c4Segundo: estruturaNeuronal, // Estrutura neuronal
  
  // Capítulo 5 - Sinapses: quando os neurônios conversam
  c5: sinapse, // Sinapse

  // Capítulo 6 - Plasticidade cerebral: o cérebro que muda
  c6: formacaoHabito, // Formando hábitos
  c6Segundo: enfraquecendoHabito, // Enfraquecendo hábitos
};

/**
 * Lista de categorias que podem ter associações com outros conteúdos
 */
const ASSOCIATION_CATEGORIES: AssociationCategoria[] = ['emocoes', 'neurotransmissores', 'partesCerebro'];

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * FUNÇÃO: toTitleCase
 * 
 * O que faz: Transforma uma string para formato "Título" (primeira letra de cada palavra em maiúscula)
 * 
 * Exemplo:
 * - Input: "sistema_limbico" ou "alegria"
 * - Output: "Sistema Limbico" ou "Alegria"
 * 
 * Como funciona:
 * 1. replace(/_/g, ' ') -> Substitui todos os underscores (_) por espaços
 *    "sistema_limbico" vira "sistema limbico"
 * 
 * 2. replace(/\b\w/g, ...) -> Encontra a primeira letra de cada palavra (\b = borda da palavra, \w = letra)
 *    Para cada primeira letra encontrada, transforma em maiúscula
 *    "sistema limbico" vira "Sistema Limbico"
 */
function toTitleCase(str: string): string {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (txt) => txt.toUpperCase());
}

/**
 * FUNÇÃO: getImageSource
 * 
 * O que faz: Busca uma imagem no registry a partir de uma chave
 * 
 * @param imgKey - Chave da imagem (ex: "c4Segundo")
 * @returns A imagem importada ou undefined se não encontrou
 */
function getImageSource(imgKey: string): any {
  return IMAGE_REGISTRY[imgKey];
}

// ============================================================================
// FUNÇÕES DE PROCESSAMENTO DE TEXTO
// ============================================================================

/**
 * FUNÇÃO: renderWithHighlight
 * 
 * O que faz: Encontra texto entre ** (negrito) e transforma em componentes Text estilizados
 * 
 * Exemplo:
 * Input: "O cérebro é o **centro de comando** do corpo"
 * Output: [<Text>"O cérebro é o "</Text>, <Text style={highlight}>"centro de comando"</Text>, <Text>" do corpo"</Text>]
 * 
 * Como funciona:
 * 1. split(/(\*\*.*?\*\*)/g) -> Divide o texto, mas mantém o texto entre ** separado
 *    A regex captura qualquer coisa entre ** (o ? torna não-guloso, pegando o primeiro ** que fecha)
 * 
 * 2. Para cada parte:
 *    - Se começa e termina com ** -> Remove os ** e aplica estilo de negrito
 *    - Caso contrário -> Renderiza como texto normal
 */
function renderWithHighlight(str: string, keyBase: string): React.ReactNode[] {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const clean = part.slice(2, -2);
      return (
        <Text key={`${keyBase}-${idx}`} style={styles.highlight}>
          {clean}
        </Text>
      );
    }
    return <Text key={`${keyBase}-${idx}`}>{part}</Text>;
  });
}

/**
 * FUNÇÃO: isImageLine
 * 
 * Verifica se uma linha é uma referência de imagem no formato ![nomeImagem]
 */
function isImageLine(line: string): boolean {
  return line.startsWith('![') && line.endsWith(']');
}

/**
 * FUNÇÃO: processImageLine
 * 
 * Processa uma linha que contém uma referência de imagem e retorna o componente Image
 */
function processImageLine(line: string, index: number): React.ReactNode | null {
  const imgKey = line.slice(2, -1); // Remove ![ e ]
  const source = getImageSource(imgKey);
  
  if (!source) return null;
  
  return (
    <Image
      key={`img-${index}`}
      source={source}
      style={styles.chapterImage}
      contentFit="contain"
    />
  );
}

/**
 * FUNÇÃO: isPotentialTitle
 * 
 * Detecta se uma linha parece ser um título de seção
 * 
 * Como identifica um título:
 * - NÃO começa com "-" (não é item de lista)
 * - Começa com letra maiúscula (incluindo acentos)
 * - Contém apenas letras, espaços e pontuação comum
 * - Tem no máximo 11 palavras (títulos geralmente são curtos)
 */
function isPotentialTitle(line: string): boolean {
  return (
    !line.startsWith('-') &&
    /^[A-ZÁÉÍÓÚÂÊÔÃÕÀÇ][A-Za-zÁÉÍÓÚÂÊÔÃÕà-úç\s,;:!?"'()-]+$/.test(line) &&
    line.split(' ').length <= 12
  );
}

/**
 * FUNÇÃO: processTitleLine
 * 
 * Processa uma linha que é um título e retorna o componente Text formatado
 */
function processTitleLine(line: string, leadingSpaces: string, index: number): React.ReactNode {
  return (
    <Text key={index} style={styles.sectionTitle}>
      {leadingSpaces}{line}
    </Text>
  );
}

/**
 * FUNÇÃO: isListItemWithTitle
 * 
 * Verifica se uma linha é um item de lista com título e descrição
 * Formato: "- Título: descrição"
 */
function isListItemWithTitle(line: string): boolean {
  return line.startsWith('-') && line.includes(':');
}

/**
 * FUNÇÃO: processListItemWithTitle
 * 
 * Processa um item de lista com título e descrição
 * Formato: "- Título: descrição"
 */
function processListItemWithTitle(line: string, index: number): React.ReactNode | null {
  const match = line.match(/^-\s*(.+?):\s*(.+)$/);
  
  if (!match) return null;
  
  const [, title, description] = match;
  
  return (
    <View key={index} style={styles.listItem}>
      <Text style={styles.listBullet}>•</Text>
      <View style={styles.listContent}>
        <Text>
          <Text style={styles.listTitle}>{title}: </Text>
          <Text style={styles.listDescription}>
            {renderWithHighlight(description, `line-${index}`)}
          </Text>
        </Text>
      </View>
    </View>
  );
}

/**
 * FUNÇÃO: isSimpleListItem
 * 
 * Verifica se uma linha é um item de lista simples
 * Formato: "- algo"
 */
function isSimpleListItem(line: string): boolean {
  return line.startsWith('-');
}

/**
 * FUNÇÃO: processSimpleListItem
 * 
 * Processa um item de lista simples
 * Formato: "- algo"
 */
function processSimpleListItem(line: string, index: number): React.ReactNode {
  const content = line.substring(1).trim();
  
  return (
    <View key={index} style={styles.listItem}>
      <Text style={styles.listBullet}>•</Text>
      <Text style={styles.listDescription}>
        {renderWithHighlight(content, `line-${index}`)}
      </Text>
    </View>
  );
}

/**
 * FUNÇÃO: processNormalText
 * 
 * Processa uma linha de texto normal (parágrafo)
 * Ainda processa **texto** para negrito e preserva espaços iniciais
 */
function processNormalText(line: string, leadingSpaces: string, index: number): React.ReactNode {
  return (
    <Text key={index} style={styles.content}>
      {leadingSpaces}
      {renderWithHighlight(line, `line-${index}`)}
    </Text>
  );
}

// ============================================================================
// FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO
// ============================================================================

/**
 * FUNÇÃO: renderFormattedContent
 * 
 * O que faz: Pega um texto em formato markdown simples e transforma em componentes React renderizáveis
 * 
 * Formatações suportadas:
 * - **texto** -> texto em negrito
 * - ![nomeImagem] -> insere uma imagem no meio do texto
 * - Linhas que começam com "- " -> cria lista com bullets
 * - Linhas com "- Título: descrição" -> cria item de lista com título e descrição
 * - Linhas que parecem títulos (começam com maiúscula, até 11 palavras) -> formata como título de seção
 * 
 * Como funciona:
 * 1. Divide o texto em linhas (split('\n'))
 * 2. Analisa cada linha e decide qual componente React criar
 * 3. Retorna um array de componentes React prontos para renderizar
 */
function renderFormattedContent(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    // Preserva espaços no início da linha (para indentação/margin)
    const leadingSpaces = line.match(/^(\s*)/)?.[0] || '';
    const trimmedLine = line.trimStart();

    // Linha vazia -> quebra de linha
    if (!trimmedLine) {
      elements.push(<Text key={index}>{'\n'}</Text>);
      return;
    }

    // CASO 1: Imagem inline
    if (isImageLine(trimmedLine)) {
      const imageElement = processImageLine(trimmedLine, index);
      if (imageElement) elements.push(imageElement);
      return;
    }

    // CASO 2: Título de seção
    if (isPotentialTitle(trimmedLine)) {
      elements.push(processTitleLine(trimmedLine, leadingSpaces, index));
      return;
    }

    // CASO 3: Item de lista com título e descrição
    if (isListItemWithTitle(trimmedLine)) {
      const listItem = processListItemWithTitle(trimmedLine, index);
      if (listItem) elements.push(listItem);
      return;
    }

    // CASO 4: Item de lista simples
    if (isSimpleListItem(trimmedLine)) {
      elements.push(processSimpleListItem(trimmedLine, index));
      return;
    }

    // CASO 5: Texto normal (parágrafo)
    elements.push(processNormalText(trimmedLine, leadingSpaces, index));
  });

  return <>{elements}</>;
}

// ============================================================================
// COMPONENTES DE RENDERIZAÇÃO
// ============================================================================

/**
 * COMPONENTE: ChapterImages
 * 
 * Renderiza as imagens do capítulo que estão no array images
 * (Diferente de imagens inline que são processadas no texto)
 */
function ChapterImages({ images }: { images: string[] }) {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <View style={styles.imagesContainer}>
      {images.map((imgKey, idx) => {
        const source = getImageSource(imgKey);
        if (!source) return null;

        return (
          <Image
            key={`${imgKey}-${idx}`}
            source={source}
            style={styles.chapterImage}
            contentFit="contain"
          />
        );
      })}
    </View>
  );
}

/**
 * COMPONENTE: RelatedMarkers
 * 
 * Renderiza os marcadores de conteúdos relacionados ao capítulo atual
 */
function RelatedMarkers({
  associations,
  from,
  router,
}: {
  associations: AssociationItem;
  from?: string;
  router: ReturnType<typeof useRouter>;
}) {
  const markers = ASSOCIATION_CATEGORIES.flatMap((categoria) =>
    associations[categoria].map((chave: string) => ({
      categoria,
      chave,
    }))
  );

  if (markers.length === 0) {
    return null;
  }

  return (
    <View style={styles.markers}>
      {markers.map(({ categoria, chave }) => (
        <TouchableOpacity
          key={`${categoria}-${chave}`}
          style={styles.marker}
          onPress={() =>
            router.push(
              `/chapters?tipo=${categoria}&id=${chave}&name=${encodeURIComponent(toTitleCase(chave))}&from=${from || categoria}`
            )
          }
        >
          <Text style={styles.textMarker} numberOfLines={2} ellipsizeMode="tail">
            {toTitleCase(chave)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

/**
 * COMPONENTE: ErrorState
 * 
 * Renderiza a tela de erro quando não consegue carregar o capítulo
 */
function ErrorState({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <FontAwesome6 name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <Text style={styles.content}>Não foi possível carregar o capítulo.</Text>
      </View>
    </View>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * COMPONENTE PRINCIPAL: ChapterContent
 * 
 * O que faz: Renderiza a página de conteúdo de um capítulo específico
 * 
 * Fluxo geral:
 * 1. Recebe parâmetros da navegação (categoria, tipo, chapterId)
 * 2. Busca os dados do capítulo no arquivo contents
 * 3. Renderiza título, conteúdo formatado, imagens e botão de completar
 * 4. Mostra marcadores de conteúdos relacionados (outros temas conectados)
 */
export default function ChapterContent() {
  const route = useRoute();
  const router = useRouter();
  
  // Extrai os parâmetros da rota e define seus tipos
  const { categoria, tipo, chapterId, title, from } = route.params as {
    categoria: keyof typeof contents;
    tipo: string;
    chapterId: string | number;
    title?: string;
    from?: string;
  };

  // Converte chapterId para número e string
  const chapterIdNum = Number(chapterId);
  const chapterIdString = chapterId.toString();
  
  // Hook do contexto que gerencia o progresso dos capítulos
  const { markChapterAsCompleted, unmarkChapterAsCompleted, isChapterCompleted } =
    useChapterProgressContext();

  // Busca os dados do capítulo na estrutura de dados
  const chapterData: ChapterContentType | undefined =
    contents[categoria]?.[tipo as keyof typeof contents[typeof categoria]]?.[chapterIdNum];

  // Busca as associações (conteúdos relacionados) do tipo atual
  const chapterAssociations: AssociationItem = associations[tipo] || {
    emocoes: [],
    neurotransmissores: [],
    partesCerebro: [],
  };

  // Handlers
  const handleBack = () => router.back();
  const handleChapterComplete = async (chapterId: string) => await markChapterAsCompleted(chapterId);
  const handleChapterUncomplete = async (chapterId: string) => await unmarkChapterAsCompleted(chapterId);

  // Se não encontrou os dados do capítulo, mostra erro
  if (!chapterData) {
    return <ErrorState onBack={handleBack} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome6 name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <RelatedMarkers associations={chapterAssociations} from={from} router={router} />

          <View style={styles.contentContainer}>
            <Text style={styles.title}>{chapterData.title}</Text>
            
            {renderFormattedContent(chapterData.content)}

            {chapterData.images && (
              <ChapterImages images={chapterData.images} />
            )}

            {chapterData.contentAfterImages && (
              renderFormattedContent(chapterData.contentAfterImages)
            )}

            <View style={styles.buttonContainer}>
              <ChapterCompleteButton
                chapterId={chapterIdString}
                isCompleted={isChapterCompleted(chapterIdString)}
                onComplete={handleChapterComplete}
                onUncomplete={handleChapterUncomplete}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// ============================================================================
// ESTILOS
// ============================================================================

/**
 * ESTILOS DO COMPONENTE
 * 
 * Define todos os estilos visuais usados na página
 * Cada propriedade controla aparência, espaçamento, cores, fontes, etc.
 */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  header: { height: 200, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', paddingTop: 50, position: 'relative' },
  backButton: { position: 'absolute', top: 40, left: 20, padding: 8, borderRadius: 8 },
  contentWrapper: { borderTopRightRadius: 50, borderTopLeftRadius: 50, flex: 1, backgroundColor: colors.surface, marginTop: -40, paddingTop: 10 },
  scrollContainer: { flexGrow: 1, padding: 16, paddingBottom: 32 },
  contentContainer: { flex: 1, minHeight: '100%' },
  chapterImage: { width: 380, height: 250, alignSelf: 'center', marginVertical: 15 },
  title: { fontSize: 28, marginBottom: 12, color: colors.textPrimary, fontFamily: fontFamily.semibold },
  sectionTitle: { fontSize: 22, color: colors.textPrimary, fontFamily: fontFamily.semibold, marginTop: 20, marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 24, color: colors.textPrimary, fontFamily: fontFamily.regular },
  highlight: { fontSize: 16, lineHeight: 24, fontFamily: fontFamily.semibold, color: colors.textPrimary },
  listItem: { flexDirection: 'row', marginBottom: 12, paddingLeft: 4 },
  listBullet: { fontSize: 16, color: colors.textPrimary, marginRight: 8, marginTop: 2 },
  listContent: { flex: 1 },
  listTitle: { fontSize: 16, lineHeight: 24, color: colors.textPrimary, fontFamily: fontFamily.semibold },
  listDescription: { fontSize: 16, lineHeight: 24, color: colors.textPrimary, fontFamily: fontFamily.regular },
  imagesContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 25 },
  markers: { padding: 20, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 5 },
  marker: { paddingHorizontal: 15, paddingVertical: 0, backgroundColor: colors.accentPurple, width: 100, height: 28, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, marginVertical: 5 },
  textMarker: { fontFamily: fontFamily.regular, color: colors.textOnDark, fontSize: 11, textAlign: 'center', fontWeight: '500', lineHeight: 13 },
  buttonContainer: { alignItems: 'center', marginTop: 24, marginBottom: 16 },
});
