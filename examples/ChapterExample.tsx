import ChapterCompleteButton from '@/components/ChapterCompleteButton';
import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { useChapterProgressContext } from '@/contexts/ChapterProgressContext';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

interface ChapterExampleProps {
  chapterId: string;
  chapterTitle: string;
  userId: string | null;
}

export default function ChapterExample({ chapterId, chapterTitle, userId }: ChapterExampleProps) {
  const { markChapterAsCompleted, unmarkChapterAsCompleted, isChapterCompleted } = useChapterProgressContext();

  const handleComplete = async (id: string) => {
    const success = await markChapterAsCompleted(id);
    if (success) {
      Alert.alert('Parabéns!', 'Capítulo marcado como concluído!');
    }
  };

  const handleUncomplete = async (id: string) => {
    const success = await unmarkChapterAsCompleted(id);
    if (success) {
      Alert.alert('Desmarcado!', 'Capítulo desmarcado como concluído!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chapterTitle}</Text>
      
      {/* Conteúdo do capítulo aqui */}
      <Text style={styles.content}>
        Este é um exemplo de capítulo. Aqui você pode colocar todo o conteúdo educativo.
      </Text>

      {/* Botão para marcar como concluído */}
      <ChapterCompleteButton
        chapterId={chapterId}
        isCompleted={isChapterCompleted(chapterId)}
        onComplete={handleComplete}
        onUncomplete={handleUncomplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    lineHeight: 24,
  },
});
