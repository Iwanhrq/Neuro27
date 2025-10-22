import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  const navigation = useNavigation();

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Botão de Menu */}
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <FontAwesome name="bars" size={25} color={colors.surfaceLight} />
        </TouchableOpacity>

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
              icon={emotion.id}
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
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
