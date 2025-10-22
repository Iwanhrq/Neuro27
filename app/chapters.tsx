import colors from '@/constants/colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Bookmark, BookmarkCheck } from 'lucide-react-native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AssociationCategoria, AssociationItem, associations } from '../constants/associations';
import { chapters } from '../constants/chapters';
import { fontFamily } from '../constants/fonts';
import { useChapterProgressContext } from '../contexts/ChapterProgressContext';
import { useSavedChaptersContext } from '../contexts/SavedChaptersContext';


// Função utilitária para deixar a primeira letra de cada palavra maiúscula
function toTitleCase(str: string) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (txt) => txt.toUpperCase());
}

export default function Chapters() {
  const { tipo, id, name, from } = useLocalSearchParams<{ tipo?: string; id?: string; name?: string; from?: string }>();
  const router = useRouter();
  
  // Usar o contexto para gerenciar capítulos lidos
  const { completedChapters, isChapterCompleted } = useChapterProgressContext();
  const { isChapterSaved, addSavedChapter, removeSavedChapter } = useSavedChaptersContext();

  if (!tipo || !id) return <Text style={styles.loading}>Loading...</Text>;

  // Lista de capítulos para o tipo e id atuais
  const lista = (chapters as any)[tipo]?.[id] || [];

  // Associações para o item atual, padrão vazio se não existir
  const assoc: AssociationItem = associations[id as string] || {
    emocoes: [],
    neurotransmissores: [],
    partesCerebro: [],
  };

  const categorias: AssociationCategoria[] = ['emocoes', 'neurotransmissores', 'partesCerebro'];

  // Função para salvar/remover capítulo
  const toggleSaveChapter = async (chapterId: string, chapterTitle: string) => {
    const fullChapterId = `${tipo}_${id}_${chapterId}`;
    
    if (isChapterSaved(fullChapterId)) {
      await removeSavedChapter(fullChapterId);
    } else {
      // Criar objeto do capítulo para salvar
      const chapterToSave = {
        id: fullChapterId,
        title: chapterTitle,
        description: `Capítulo sobre ${name}`,
        category: toTitleCase(tipo),
        progress: isChapterCompleted(chapterId) ? 100 : 0,
        lastRead: new Date().toISOString().split('T')[0],
        timeToRead: '15 min',
        difficulty: 'Intermediário',
        image: tipo === 'neurotransmissores' ? '⚡' : tipo === 'emocoes' ? '💭' : '🧠',
        isCompleted: isChapterCompleted(chapterId),
        tipo: tipo,
        subtipo: id,
        chapterId: parseInt(chapterId),
      };
      
      await addSavedChapter(chapterToSave);
    }
  };

  // Função para calcular o progresso
  const calculateProgress = () => {
    if (lista.length === 0) return 0;
    const completedInThisList = lista.filter(item => isChapterCompleted(item.id.toString())).length;
    return (completedInThisList / lista.length) * 100;
  };

  // Função para navegar para o conteúdo do capítulo
  const navigateToChapterContent = (chapterId: string, chapterTitle: string) => {
    // Navega para a tela de conteúdo (sem marcar como lido automaticamente)
    router.push(`/chapter-content?chapterId=${chapterId}&title=${encodeURIComponent(chapterTitle)}&categoria=${tipo}&tipo=${id}&from=${from}`);
  };

  // Função para marcar capítulo como concluído (chamada após questionário)
  const markChapterAsCompleted = (chapterId: string) => {
    // Esta função não é mais necessária pois o contexto gerencia isso
    // Mantida para compatibilidade se necessário
  };

  const handleBack = () => {
    router.back(); // volta para a página anterior
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Botão de voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessibilityLabel="Voltar"
        >
          <FontAwesome6 name="arrow-left" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {name ? decodeURIComponent(name) : id.replace(/_/g, ' ').replace(/\b\w/g, (str) => str.toUpperCase())}
        </Text>
      </View>

      <View style={styles.content}>
        {/* Renderiza todos os marcadores juntos, sem título */}
        <View style={styles.markers}>
          {categorias.flatMap((categoria) =>
            assoc[categoria].map((chave: string) => (
              <TouchableOpacity
                key={categoria + '-' + chave}
                style={styles.marker}
                onPress={() =>
                  router.push(`/chapters?tipo=${categoria}&id=${chave}&name=${encodeURIComponent(toTitleCase(chave))}&from=${from}`)
                }
              >
                <Text style={styles.textMarker} numberOfLines={2} ellipsizeMode="tail">{toTitleCase(chave)}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Barra de progresso */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${calculateProgress()}%` }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {lista.filter(item => isChapterCompleted(item.id.toString())).length}/{lista.length} capítulos lidos
          </Text>
        </View>

        {/* Lista de capítulos */}
        <FlatList
          data={lista}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.chapterItem,
                isChapterCompleted(item.id.toString()) && styles.chapterItemRead
              ]}
              onPress={() => navigateToChapterContent(item.id.toString(), item.title)}
            >
              <View style={styles.chapterContent}>
                <Text style={[
                  styles.chapterTitle,
                  isChapterCompleted(item.id.toString()) && styles.chapterTitleRead
                ]}>
                  {item.title}
                </Text>
                {isChapterCompleted(item.id.toString()) && (
                  <Text style={styles.readIndicator}>✓ Lido</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => toggleSaveChapter(item.id.toString(), item.title)}
                accessibilityLabel={isChapterSaved(`${tipo}_${id}_${item.id}`) ? "Remover dos salvos" : "Salvar capítulo"}
              >
                {isChapterSaved(`${tipo}_${id}_${item.id}`) ? (
                  <BookmarkCheck color={colors.brand} size={24} />
                ) : (
                  <Bookmark color={colors.textSecondary} size={24} />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Não foram encontrados capítulos.</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    height: 200,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 28,
  },
  progressContainer: {
    width: '90%',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: colors.surfaceLight,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accentPurpleDark,
    borderRadius: 6,
  },
  progressText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
    opacity: 0.8,
  },
  content: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    flex: 1,
    backgroundColor: colors.surface,
    marginTop: -40,
    paddingTop: 10,
  },
  markers: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  marker: {
    paddingHorizontal: 15,
    paddingVertical: 0,
    backgroundColor: colors.accentPurple,
    width: 100,
    height: 28,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  textMarker: {
    fontFamily: fontFamily.regular,
    color: colors.textOnDark,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 13,
  },
  chapterItem: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  chapterItemRead: {
    backgroundColor: colors.surfaceLight,
    opacity: 0.7,
  },
  chapterContent: {
    flex: 1,
    marginRight: 10,
  },
  chapterTitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  chapterTitleRead: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  readIndicator: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.accentPurpleDark,
    marginTop: 2,
  },
  saveButton: {
    padding: 8,
    borderRadius: 20,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
  },
  loading: {
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
    fontSize: 18,
  },
  markersGroup: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
