import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// URL base da API
const API_URL = 'https://api-teste-tm4f.onrender.com';

interface Neurotransmitter {
  id: string;
  name: string;
  description: string;
}

export default function NeurotransmittersScreen() {
  const router = useRouter();
  const [neurotransmitters, setNeurotransmitters] = useState<Neurotransmitter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNeurotransmitters = async () => {
      try {
        const response = await fetch(`${API_URL}/neurotransmitters`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        setNeurotransmitters(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError('Não foi possível carregar a lista de neurotransmissores');
      } finally {
        setLoading(false);
      }
    };

    fetchNeurotransmitters();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#001B29" />
        <Text style={styles.loadingText}>Carregando neurotransmissores...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => setLoading(true)}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Neurotransmissores</Text>
        <Text style={styles.subtitle}>
          Conheça os principais neurotransmissores e suas funções no cérebro
        </Text>

        {neurotransmitters.map((neurotransmitter) => (
          <TouchableOpacity
            key={neurotransmitter.id}
            style={styles.card}
            onPress={() => router.push({
              pathname: '/neurotransmitter/[id]',
              params: { id: neurotransmitter.id }
            })}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{neurotransmitter.name}</Text>
              <Text style={styles.cardDescription} numberOfLines={2}>
                {neurotransmitter.description}
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={20} color="#001B29" />
          </TouchableOpacity>
        ))}
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
  title: {
    paddingTop: 30,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#001B29',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F6F8FB',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001B29',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 