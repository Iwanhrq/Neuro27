import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// URL base da API
const API_URL = 'https://api-teste-tm4f.onrender.com';

// Interface para os dados da parte do cérebro
interface BrainPartDetail {
  id: string;
  name: string;
  description: string;
  functions: string[];
  effects: string[];
  relatedConditions: string[];
}

export default function BrainPartDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [brainPart, setBrainPart] = useState<BrainPartDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrainPart = async () => {
      try {
        console.log('Buscando dados para o ID:', id);
        console.log('URL:', `${API_URL}/brainparts/${id}`);
        
        const response = await fetch(`${API_URL}/brainparts/${id}`);
        console.log('Status da resposta:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Resposta da API:', errorText);
          throw new Error(`Erro ao buscar dados: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Dados recebidos:', data);
        setBrainPart(data);
      } catch (error) {
        console.error('Erro detalhado:', error);
        setError('Não foi possível carregar os detalhes da parte do cérebro. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrainPart();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#001B29" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !brainPart) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Parte do cérebro não encontrada'}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#001B29" />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{brainPart.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funções</Text>
          {brainPart.functions.map((function_, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.listText}>{function_}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Efeitos</Text>
          {brainPart.effects.map((effect, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.listText}>{effect}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condições Relacionadas</Text>
          {brainPart.relatedConditions.map((condition, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.listText}>{condition}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#001B29',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#001B29',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 15,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 20,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#001B29',
    marginRight: 8,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});
