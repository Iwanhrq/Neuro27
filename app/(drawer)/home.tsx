import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import dopaminImage from '../../assets/images/dopamin.png';
import serotoninImage from '../../assets/images/serotonin.png';
import { EmotionCard, NeurotransmitterCard } from '../../components';
import BrainPartCard from '../../components/BrainPartCard';

const NEUROTRANSMITTERS = [
  { id: 'dopamina', name: 'Dopamina', info: 'Lorem ipsum...', image: dopaminImage },
  { id: 'serotonina', name: 'Serotonina', info: 'Lorem ipsum...', image: serotoninImage },
  { id: 'acetilcolina', name: 'Acetilcolina', info: 'Lorem ipsum...', image: dopaminImage },
  { id: 'gaba', name: 'GABA', info: 'Lorem ipsum...', image: serotoninImage },
  { id: 'glutamato', name: 'Glutamato', info: 'Lorem ipsum...', image: dopaminImage },
  { id: 'noradrenalina', name: 'Noradrenalina', info: 'Lorem ipsum...', image: dopaminImage },
];

const BRAIN_PARTS = [
  { id: 'cerebro', name: 'Cérebro' },
  { id: 'cerebelo', name: 'Cerebelo' },
  { id: 'tronco', name: 'Tronco Cerebral' },
  { id: 'hipotalamo', name: 'Hipotálamo' },
  { id: 'amigdala', name: 'Amígdala' },
];

const EMOTIONS = [
  { id: 'alegria', name: 'Alegria', category: 'Positiva' },
  { id: 'tristeza', name: 'Tristeza', category: 'Negativa' },
  { id: 'raiva', name: 'Raiva', category: 'Negativa' },
  { id: 'medo', name: 'Medo', category: 'Negativa' },
  { id: 'amor', name: 'Amor', category: 'Positiva' },
];

export default function Home() {
  const router = useRouter();
  const navigation = useNavigation();

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Botão de Menu fixo no topo */}
      <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
        <FontAwesome name="bars" size={25} color={colors.textOnDark} />
      </TouchableOpacity>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={[styles.brainCard, { width: Dimensions.get('window').width - 40, height: 200 }]} />
        </View>

        {/* Partes do cérebro */}
        <View style={styles.brainPartsContainer}>
          <Text style={styles.title}>Partes do cérebro</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brainPartsScroll}>
            {BRAIN_PARTS.map((brainPart) => (
              <BrainPartCard
                key={brainPart.id}
                name={brainPart.name}
                onPress={() =>
                  router.push(`/chapters?tipo=partes-cerebro&id=${brainPart.id}&name=${encodeURIComponent(brainPart.name)}&from=home`)
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* Neurotransmissores */}
        <View style={styles.neurotransmittersContainer}>
          <Text style={styles.title}>Neurotransmissores</Text>
          <View style={styles.neurotransmittersGrid}>
            <View style={styles.column}>
              {NEUROTRANSMITTERS.slice(0, 3).map((n) => (
                <NeurotransmitterCard
                  key={n.id}
                  name={n.name}
                  onPress={() =>
                    router.push(`/chapters?tipo=neurotransmissores&id=${n.id}&name=${encodeURIComponent(n.name)}&from=home`)
                  }
                />
              ))}
            </View>
            <View style={styles.column}>
              {NEUROTRANSMITTERS.slice(3, 6).map((n) => (
                <NeurotransmitterCard
                  key={n.id}
                  name={n.name}
                  onPress={() =>
                    router.push(`/chapters?tipo=neurotransmissores&id=${n.id}&name=${encodeURIComponent(n.name)}&from=home`)
                  }
                />
              ))}
            </View>
          </View>
        </View>

        {/* Emoções */}
        <View style={styles.emotionsContainer}>
          <Text style={styles.title}>Emoções</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.emotionsScroll}>
            {EMOTIONS.map((emotion) => (
              <EmotionCard
                key={emotion.id}
                name={emotion.name}
                category={emotion.category}
                onPress={() =>
                  router.push(`/chapters?tipo=emocoes&id=${emotion.id}&name=${encodeURIComponent(emotion.name)}&from=home`)
                }
              />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
  },
  menuButton: {
    alignSelf: 'flex-start',
    top: 50,
    left: 20,
    zIndex: 1000,
    backgroundColor: colors.surfaceDark,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerCard: {
    marginTop: 60,
  },
  brainCard: {
    backgroundColor: colors.brandLight,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    marginBottom: 15,
  },
  brainPartsContainer: {
    marginTop: 30,
  },
  brainPartsScroll: {
    paddingRight: 20,
  },
  emotionsContainer: {
    marginTop: 30,
  },
  emotionsScroll: {
    paddingRight: 20,
  },
  neurotransmittersContainer: {
    marginTop: 30,
  },
  neurotransmittersGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
});
