import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContentCard, HeaderCard } from '../../components';

// Dados estáticos das emoções
const EMOTIONS = [
  { id: 'emocoes', name: 'O que são as emoções?', info: 'Entenda como o cérebro cria as emoções e como elas ajudam você a reagir, se conectar e tomar decisões no dia a dia.' },
  { id: 'alegria', name: 'Alegria: energia para viver', info: 'Veja como a alegria influencia seu bem-estar, fortalece relacionamentos e aumenta a motivação' },
  { id: 'tristeza', name: 'Tristeza: a força para refletir', info: 'Aprenda por que a tristeza faz parte do equilíbrio emocional e como ela ajuda a lidar com perdas e mudanças.' },
  { id: 'raiva', name: 'Raiva: o motor da ação', info: 'Descubra como a raiva pode servir como alerta e combustível para buscar justiça ou defender limites.' },
];

export default function EmotionsScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Carrossel das Emoções */}
        <HeaderCard variant="dark" />

        {/* Lista de emoções */}
        <View style={styles.brainContainer}>
          <Text style={styles.brainTitle}>
            Emoções
          </Text>

          {EMOTIONS.map((emotion) => (
            <ContentCard
              key={emotion.id}
              title={emotion.name}
              description={emotion.info}
              onPress={() => router.push(`/chapters?tipo=emocoes&id=${emotion.id}&from=emotions`)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  brainContainer: {
    marginTop: 230,
    padding: 20,
  },
  brainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
    paddingBottom: 20,
  },
});
