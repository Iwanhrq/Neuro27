import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const TOTAL_CHAPTERS = 10;

export const useChapterProgress = (userId: string | null) => {
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Carrega progresso dos capítulos
  const loadChapterProgress = async () => {
    if (!userId) return;
    
    try {
      const savedProgress = await AsyncStorage.getItem(`chapter_progress_${userId}`);
      if (savedProgress) {
        const chapters = JSON.parse(savedProgress);
        setCompletedChapters(chapters);
        calculateProgress(chapters);
      }
    } catch (error) {
      console.log('Erro ao carregar progresso dos capítulos:', error);
    }
  };

  // Salva progresso dos capítulos
  const saveChapterProgress = async (chapters: string[]) => {
    if (!userId) return;
    
    try {
      await AsyncStorage.setItem(`chapter_progress_${userId}`, JSON.stringify(chapters));
    } catch (error) {
      console.log('Erro ao salvar progresso dos capítulos:', error);
    }
  };

  // Calcula porcentagem do progresso
  const calculateProgress = (chapters: string[]) => {
    const percentage = Math.round((chapters.length / TOTAL_CHAPTERS) * 100);
    setProgressPercentage(percentage);
  };

  // Marca capítulo como concluído
  const markChapterAsCompleted = async (chapterId: string) => {
    if (!userId) return false;

    const updatedChapters = [...completedChapters];
    if (!updatedChapters.includes(chapterId)) {
      updatedChapters.push(chapterId);
      setCompletedChapters(updatedChapters);
      calculateProgress(updatedChapters);
      await saveChapterProgress(updatedChapters);
      return true;
    }
    return false;
  };

  // Verifica se capítulo está concluído
  const isChapterCompleted = (chapterId: string) => {
    return completedChapters.includes(chapterId);
  };

  // Carrega progresso quando userId muda
  useEffect(() => {
    if (userId) {
      loadChapterProgress();
    }
  }, [userId]);

  return {
    completedChapters,
    progressPercentage,
    totalChapters: TOTAL_CHAPTERS,
    markChapterAsCompleted,
    isChapterCompleted,
  };
};
