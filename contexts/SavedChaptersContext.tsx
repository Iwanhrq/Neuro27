import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SavedChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  lastRead: string;
  timeToRead: string;
  difficulty: string;
  image: string;
  isCompleted: boolean;
  tipo: string; // neurotransmissores, emocoes, partesCerebro
  subtipo: string; // dopamina, alegria, etc.
  chapterId: number; // ID do capítulo dentro do subtipo
}

interface SavedChaptersContextType {
  savedChapters: SavedChapter[];
  savedChapterIds: Set<string>;
  addSavedChapter: (chapter: SavedChapter) => Promise<void>;
  removeSavedChapter: (chapterId: string) => Promise<void>;
  isChapterSaved: (chapterId: string) => boolean;
  loadSavedChapters: () => Promise<void>;
}

const SavedChaptersContext = createContext<SavedChaptersContextType | undefined>(undefined);

export const useSavedChaptersContext = () => {
  const context = useContext(SavedChaptersContext);
  if (!context) {
    throw new Error('useSavedChaptersContext must be used within a SavedChaptersProvider');
  }
  return context;
};

interface SavedChaptersProviderProps {
  children: React.ReactNode;
  userId?: string;
}

export const SavedChaptersProvider: React.FC<SavedChaptersProviderProps> = ({ 
  children, 
  userId = "demo_user" 
}) => {
  const [savedChapters, setSavedChapters] = useState<SavedChapter[]>([]);
  const [savedChapterIds, setSavedChapterIds] = useState<Set<string>>(new Set());

  // Carrega capítulos salvos do AsyncStorage
  const loadSavedChapters = async () => {
    try {
      const savedData = await AsyncStorage.getItem(`saved_chapters_${userId}`);
      if (savedData) {
        const chapters = JSON.parse(savedData);
        setSavedChapters(chapters);
        setSavedChapterIds(new Set(chapters.map((c: SavedChapter) => c.id)));
      }
    } catch (error) {
      console.log('Erro ao carregar capítulos salvos:', error);
    }
  };

  // Adiciona um capítulo aos salvos
  const addSavedChapter = async (chapter: SavedChapter) => {
    try {
      const updatedChapters = [...savedChapters, chapter];
      setSavedChapters(updatedChapters);
      setSavedChapterIds(new Set(updatedChapters.map(c => c.id)));
      
      await AsyncStorage.setItem(`saved_chapters_${userId}`, JSON.stringify(updatedChapters));
    } catch (error) {
      console.log('Erro ao salvar capítulo:', error);
    }
  };

  // Remove um capítulo dos salvos
  const removeSavedChapter = async (chapterId: string) => {
    try {
      const updatedChapters = savedChapters.filter(c => c.id !== chapterId);
      setSavedChapters(updatedChapters);
      setSavedChapterIds(new Set(updatedChapters.map(c => c.id)));
      
      await AsyncStorage.setItem(`saved_chapters_${userId}`, JSON.stringify(updatedChapters));
    } catch (error) {
      console.log('Erro ao remover capítulo:', error);
    }
  };

  // Verifica se um capítulo está salvo
  const isChapterSaved = (chapterId: string) => {
    return savedChapterIds.has(chapterId);
  };

  // Carrega capítulos salvos quando o userId muda
  useEffect(() => {
    if (userId) {
      loadSavedChapters();
    }
  }, [userId]);

  const value: SavedChaptersContextType = {
    savedChapters,
    savedChapterIds,
    addSavedChapter,
    removeSavedChapter,
    isChapterSaved,
    loadSavedChapters,
  };

  return (
    <SavedChaptersContext.Provider value={value}>
      {children}
    </SavedChaptersContext.Provider>
  );
};

