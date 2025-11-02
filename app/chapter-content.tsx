import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRoute } from "@react-navigation/native";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cerebro1 from '../assets/images/cerebroc1.png';
import hemisferio from '../assets/images/hemisferio.png';
import novaImagem from '../assets/images/tronco.png'; 
import { ChapterCompleteButton } from "../components";
import { AssociationCategoria, AssociationItem, associations } from "../constants/associations";
import { ChapterContentType, contents } from "../constants/chapter-content";
import { useChapterProgressContext } from "../contexts/ChapterProgressContext";

// Função utilitária para deixar a primeira letra de cada palavra maiúscula
function toTitleCase(str: string) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (txt) => txt.toUpperCase());
}

// Função para renderizar conteúdo com formatação e grifo de palavras usando '**' e imagens no meio do texto
function renderFormattedContent(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  const renderWithHighlight = (str: string, keyBase: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g); // divide pelo **texto**
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const clean = part.slice(2, -2);
        return (
          <Text key={`${keyBase}-${idx}`} style={styles.highlight}>
            {clean}
          </Text>
        );
      } else {
        return <Text key={`${keyBase}-${idx}`}>{part}</Text>;
      }
    });
  };

  lines.forEach((line, index) => {
    const leadingSpaces = line.match(/^(\s*)/)?.[0] || ''; // pega espaços iniciais
    const trimmedLine = line.trimStart();

    if (!trimmedLine) {
      elements.push(<Text key={index}>{'\n'}</Text>);
      return;
    }

    // Inserção de imagem no meio do texto: usar ![nomeImagem]
    if (trimmedLine.startsWith('![') && trimmedLine.endsWith(']')) {
      const imgKey = trimmedLine.slice(2, -1); // pega o que está dentro de ![ ... ]
      const registry: Record<string, any> = { c1: cerebro1, c2: hemisferio, c3: novaImagem };
      const source = registry[imgKey];
      if (source) {
        elements.push(
          <Image
            key={`img-${index}`}
            source={source}
            style={styles.chapterImage}
            contentFit="contain"
          />
        );
      }
      return;
    }

    // Detecta títulos
    const isPotentialTitle =
      !trimmedLine.startsWith('-') &&
      /^[A-ZÁÉÍÓÚÂÊÔÃÕÀÇ][A-Za-zÁÉÍÓÚÂÊÔÃÕà-úç\s,;:!?"'()-]+$/.test(trimmedLine) &&
      trimmedLine.split(' ').length <= 10;

    if (isPotentialTitle) {
      elements.push(
        <Text key={index} style={styles.sectionTitle}>
          {leadingSpaces}{trimmedLine}
        </Text>
      );
      return;
    }

    // Item de lista com título: "- Título: descrição"
    if (trimmedLine.startsWith('-') && trimmedLine.includes(':')) {
      const match = trimmedLine.match(/^-\s*(.+?):\s*(.+)$/);
      if (match) {
        const [, title, description] = match;
        elements.push(
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
        return;
      }
    }

    // Item de lista simples: "- algo"
    if (trimmedLine.startsWith('-')) {
      const content = trimmedLine.substring(1).trim();
      elements.push(
        <View key={index} style={styles.listItem}>
          <Text style={styles.listBullet}>•</Text>
          <Text style={styles.listDescription}>
            {renderWithHighlight(content, `line-${index}`)}
          </Text>
        </View>
      );
      return;
    }

    // Texto normal com grifo de palavras entre '**' e mantendo espaços iniciais
    elements.push(
      <Text key={index} style={styles.content}>
        {leadingSpaces}
        {renderWithHighlight(trimmedLine, `line-${index}`)}
      </Text>
    );
  });

  return <>{elements}</>;
}

export default function ChapterContent() {
  const route = useRoute();
  const router = useRouter();
  const { categoria, tipo, chapterId, title, from } = route.params as {
    categoria: keyof typeof contents;
    tipo: string;
    chapterId: string | number;
    title?: string;
    from?: string;
  };

  const chapterIdNum = Number(chapterId);
  const chapterIdString = chapterId.toString();
  const { markChapterAsCompleted, unmarkChapterAsCompleted, isChapterCompleted } = useChapterProgressContext();

  const chapterData: ChapterContentType | undefined =
    contents[categoria]?.[tipo as keyof typeof contents[typeof categoria]]?.[chapterIdNum];

  const assoc: AssociationItem = associations[tipo] || {
    emocoes: [],
    neurotransmissores: [],
    partesCerebro: [],
  };

  const categorias: AssociationCategoria[] = ['emocoes', 'neurotransmissores', 'partesCerebro'];

  const handleBack = () => router.back();
  const handleChapterComplete = async (chapterId: string) => await markChapterAsCompleted(chapterId);
  const handleChapterUncomplete = async (chapterId: string) => await unmarkChapterAsCompleted(chapterId);

  if (!chapterData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <FontAwesome6 name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          <Text style={styles.content}>Não foi possível carregar o capítulo.</Text>
        </View>
      </View>
    );
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
          {/* Marcadores de conteúdos relacionados */}
          <View style={styles.markers}>
            {categorias.flatMap((categoria) =>
              assoc[categoria].map((chave: string) => (
                <TouchableOpacity
                  key={categoria + '-' + chave}
                  style={styles.marker}
                  onPress={() =>
                    router.push(`/chapters?tipo=${categoria}&id=${chave}&name=${encodeURIComponent(toTitleCase(chave))}&from=${from || categoria}`)
                  }
                >
                  <Text style={styles.textMarker} numberOfLines={2} ellipsizeMode="tail">
                    {toTitleCase(chave)}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>{chapterData.title}</Text>
            {renderFormattedContent(chapterData.content)}

            {Array.isArray(chapterData.images) && chapterData.images.length > 0 && (
              <View style={styles.imagesContainer}>
                {chapterData.images.map((imgKey, idx) => {
                  const registry: Record<string, any> = { c1: cerebro1, c2: hemisferio, c3: novaImagem };
                  const source = registry[imgKey];
                  if (!source) return null;
                  return (
                    <Image key={`${imgKey}-${idx}`} source={source} style={styles.chapterImage} contentFit="contain" />
                  );
                })}
              </View>
            )}

            {chapterData.contentAfterImages && renderFormattedContent(chapterData.contentAfterImages)}

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
  highlight: { fontSize: 16, lineHeight: 24, fontFamily: fontFamily.semibold, color: colors.textPrimary }, // grifo preto
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
