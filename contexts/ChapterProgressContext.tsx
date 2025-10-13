import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ChapterProgressContextType {
  completedChapters: Set<string>;
  markChapterAsCompleted: (chapterId: string) => Promise<boolean>;
  unmarkChapterAsCompleted: (chapterId: string) => Promise<boolean>;
  isChapterCompleted: (chapterId: string) => boolean;
  progressPercentage: number;
  totalChapters: number;
}

const ChapterProgressContext = createContext<ChapterProgressContextType | undefined>(undefined);

export const useChapterProgressContext = () => {
  const context = useContext(ChapterProgressContext);
  if (!context) {
    throw new Error('useChapterProgressContext must be used within a ChapterProgressProvider');
  }
  return context;
};

interface ChapterProgressProviderProps {
  children: React.ReactNode;
  userId?: string;
}

export const ChapterProgressProvider: React.FC<ChapterProgressProviderProps> = ({ 
  children, 
  userId = "demo_user" 
}) => {
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());
  const [progressPercentage, setProgressPercentage] = useState(0);
  const totalChapters = 10; // Total estimado de capítulos

  // Carrega progresso dos capítulos
  const loadChapterProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem(`chapter_progress_${userId}`);
      if (savedProgress) {
        const chapters = JSON.parse(savedProgress);
        setCompletedChapters(new Set(chapters));
        calculateProgress(chapters.length);
      }
    } catch (error) {
      console.log('Erro ao carregar progresso dos capítulos:', error);
    }
  };

  // Salva progresso dos capítulos
  const saveChapterProgress = async (chapters: string[]) => {
    try {
      await AsyncStorage.setItem(`chapter_progress_${userId}`, JSON.stringify(chapters));
    } catch (error) {
      console.log('Erro ao salvar progresso dos capítulos:', error);
    }
  };

  // Calcula porcentagem do progresso
  const calculateProgress = (completedCount: number) => {
    const percentage = Math.round((completedCount / totalChapters) * 100);
    setProgressPercentage(percentage);
  };

  // Marca capítulo como concluído
  const markChapterAsCompleted = async (chapterId: string): Promise<boolean> => {
    const updatedChapters = new Set(completedChapters);
    if (!updatedChapters.has(chapterId)) {
      updatedChapters.add(chapterId);
      setCompletedChapters(updatedChapters);
      calculateProgress(updatedChapters.size);
      await saveChapterProgress(Array.from(updatedChapters));
      return true;
    }
    return false;
  };

  // Desmarca capítulo como concluído
  const unmarkChapterAsCompleted = async (chapterId: string): Promise<boolean> => {
    const updatedChapters = new Set(completedChapters);
    if (updatedChapters.has(chapterId)) {
      updatedChapters.delete(chapterId);
      setCompletedChapters(updatedChapters);
      calculateProgress(updatedChapters.size);
      await saveChapterProgress(Array.from(updatedChapters));
      return true;
    }
    return false;
  };

  // Verifica se capítulo está concluído
  const isChapterCompleted = (chapterId: string): boolean => {
    return completedChapters.has(chapterId);
  };

  // Carrega progresso quando o componente monta
  useEffect(() => {
    loadChapterProgress();
  }, [userId]);

  const value: ChapterProgressContextType = {
    completedChapters,
    markChapterAsCompleted,
    unmarkChapterAsCompleted,
    isChapterCompleted,
    progressPercentage,
    totalChapters,
  };

  return (
    <ChapterProgressContext.Provider value={value}>
      {children}
    </ChapterProgressContext.Provider>
  );
};
