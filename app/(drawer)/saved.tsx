import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { useChapterProgressContext } from '@/contexts/ChapterProgressContext';
import { useSavedChaptersContext } from '@/contexts/SavedChaptersContext';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Bookmark, BookOpen, Clock } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function SavedScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress'>('all');

  const { progressPercentage } = useChapterProgressContext();
  const { savedChapters, loadSavedChapters } = useSavedChaptersContext();

  // Carrega capítulos salvos quando a tela é montada
  useEffect(() => {
    loadSavedChapters();
  }, []);

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  const navigateToChapter = (chapter: any) => {
    router.push(`/chapter-content?chapterId=${chapter.chapterId}&title=${encodeURIComponent(chapter.title)}&categoria=${chapter.tipo}&tipo=${chapter.subtipo}&from=saved`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return colors.success;
      case 'Intermediário':
        return colors.warning;
      case 'Avançado':
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Neuroanatomia': '#8B5CF6',
      'Neuroquímica': '#06B6D4',
      'Neuropsicologia': '#10B981',
      'Neurociência Cognitiva': '#F59E0B',
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  };

  const filteredChapters = savedChapters.filter(chapter => {
    if (filter === 'completed') return chapter.isCompleted;
    if (filter === 'in-progress') return !chapter.isCompleted;
    return true;
  });

  const renderChapterCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.chapterCard}
      onPress={() => navigateToChapter(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.chapterIcon}>
          <Text style={styles.chapterEmoji}>{item.image}</Text>
        </View>
        <View style={styles.chapterInfo}>
          <Text style={styles.chapterTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.chapterDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={styles.chapterActions}>
          <Bookmark color={colors.brand} size={20} />
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.chapterMeta}>
          <View style={styles.categoryTag}>
            <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
              {item.category}
            </Text>
          </View>
          <View style={styles.difficultyTag}>
            <Text style={[styles.difficultyText, { color: getDifficultyColor(item.difficulty) }]}>
              {item.difficulty}
            </Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progresso</Text>
            <Text style={styles.progressPercentage}>{item.progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${item.progress}%` }
              ]}
            />
          </View>
        </View>

        <View style={styles.chapterFooter}>
          <View style={styles.footerItem}>
            <Clock color={colors.textSecondary} size={16} />
            <Text style={styles.footerText}>{item.timeToRead}</Text>
          </View>
          <View style={styles.footerItem}>
            <Text style={styles.footerText}>Última leitura: {item.lastRead}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer} activeOpacity={0.7}>
          <FontAwesome name="bars" size={25} color={colors.surface} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Capítulos Salvos</Text>
          <Text style={styles.headerSubtitle}>
            {savedChapters.length} capítulo{savedChapters.length !== 1 ? 's' : ''} salvo{savedChapters.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
          onPress={() => setFilter('completed')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
            Concluídos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'in-progress' && styles.filterButtonActive]}
          onPress={() => setFilter('in-progress')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterText, filter === 'in-progress' && styles.filterTextActive]}>
            Em Progresso
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chapters List */}
      <View style={styles.content}>
        {filteredChapters.length > 0 ? (
          <FlatList
            data={filteredChapters}
            renderItem={renderChapterCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <BookOpen color={colors.textSecondary} size={64} />
            <Text style={styles.emptyTitle}>Nenhum capítulo encontrado</Text>
            <Text style={styles.emptyDescription}>
              {filter === 'completed' 
                ? 'Você ainda não concluiu nenhum capítulo'
                : filter === 'in-progress'
                ? 'Você não tem capítulos em progresso'
                : 'Você ainda não salvou nenhum capítulo'
              }
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.surfaceDark,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.textOnDark,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.textOnDark,
    opacity: 0.8,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.surface,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.brand,
  },
  filterText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.textOnDark,
  },
  content: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  listContainer: {
    padding: 20,
  },
  chapterCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  chapterIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chapterEmoji: {
    fontSize: 24,
  },
  chapterInfo: {
    flex: 1,
    marginRight: 12,
  },
  chapterTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  chapterDescription: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  chapterActions: {
    justifyContent: 'center',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  chapterMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
  },
  difficultyTag: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressPercentage: {
    fontSize: 12,
    fontFamily: fontFamily.semibold,
    color: colors.brand,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brand,
    borderRadius: 3,
  },
  chapterFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
