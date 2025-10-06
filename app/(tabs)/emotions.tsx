import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContentCard } from '../../components';

// Dados estáticos das emoções
const EMOTIONS = [
  { id: 'emocoes', name: 'Emoções', title: 'O que são as emoções?', info: 'Entenda como o cérebro cria as emoções e como elas ajudam você a reagir, se conectar e tomar decisões no dia a dia.' },
  { id: 'alegria', name: 'Alegria', title: 'Alegria: energia para viver', info: 'Veja como a alegria influencia seu bem-estar, fortalece relacionamentos e aumenta a motivação' },
  { id: 'tristeza', name: 'Tristeza', title: 'Tristeza: a força para refletir', info: 'Aprenda por que a tristeza faz parte do equilíbrio emocional e como ela ajuda a lidar com perdas e mudanças.' },
  { id: 'raiva', name: 'Raiva', title: 'Raiva: o motor da ação', info: 'Descubra como a raiva pode servir como alerta e combustível para buscar justiça ou defender limites.' },
];

export default function EmotionsScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Carrossel das Emoções */}
        <View style={styles.headerCard}>
          <View style={[styles.brainCard, { width: Dimensions.get('window').width, height: 220 }]}>
          </View>
        </View>

        {/* Lista de emoções */}
        <View style={styles.brainContainer}>
          <Text style={styles.brainTitle}>
            Emoções
          </Text>

          {EMOTIONS.map((emotion) => (
            <ContentCard
              key={emotion.id}
              title={emotion.title} // título curto
              description={emotion.info} // texto longo
              onPress={() => router.push(
                `/chapters?tipo=emocoes&id=${emotion.id}&name=${encodeURIComponent(emotion.name)}&from=emotions`
              )}
              imageContainerColor={colors.accentPurpleDark} // cor roxa para emoções
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
    backgroundColor: colors.surface,
  },
  headerCard: {
    position: 'relative',
  },
  brainCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 0,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brainContainer: {
    marginTop: 10,
    padding: 20,
  },
  brainTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    paddingBottom: 20,
  },
});
