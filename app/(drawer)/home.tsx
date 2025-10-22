import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dopaminImage from '../../assets/images/dopamin.png';
import serotoninImage from '../../assets/images/serotonin.png';
import { EmotionCard, NeurotransmitterCard } from '../../components';
import BrainPartCard from '../../components/BrainPartCard';

const NEUROTRANSMITTERS = [
  { id: 'dopamina', name: 'Dopamina', info: 'Lorem ipsum...', image: dopaminImage, color: '#8B5CF6' },
  { id: 'serotonina', name: 'Serotonina', info: 'Lorem ipsum...', image: serotoninImage, color: '#06B6D4' },
  { id: 'acetilcolina', name: 'Acetilcolina', info: 'Lorem ipsum...', image: dopaminImage, color: '#10B981' },
  { id: 'gaba', name: 'GABA', info: 'Lorem ipsum...', image: serotoninImage, color: '#F59E0B' },
  { id: 'glutamato', name: 'Glutamato', info: 'Lorem ipsum...', image: dopaminImage, color: '#EF4444' },
  { id: 'noradrenalina', name: 'Noradrenalina', info: 'Lorem ipsum...', image: dopaminImage, color: '#EC4899' },
];

const BRAIN_PARTS = [
  { id: 'cerebro', name: 'Cérebro', icon: 'cerebro' },
  { id: 'cerebelo', name: 'Cerebelo', icon: 'cerebelo' },
  { id: 'tronco', name: 'Tronco Cerebral', icon: 'tronco' },
  { id: 'hipotalamo', name: 'Hipotálamo', icon: 'hipotalamo' },
  { id: 'amigdala', name: 'Amígdala', icon: 'amigdala' },
];

const EMOTIONS = [
  { id: 'alegria', name: 'Alegria', category: 'Positiva', icon: 'alegria' },
  { id: 'tristeza', name: 'Tristeza', category: 'Negativa', icon: 'tristeza' },
  { id: 'raiva', name: 'Raiva', category: 'Negativa', icon: 'raiva' },
  { id: 'medo', name: 'Medo', category: 'Negativa', icon: 'medo' },
  { id: 'amor', name: 'Amor', category: 'Positiva', icon: 'amor' },
];

export default function Home() {
  const router = useRouter();
  const navigation = useNavigation();

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  const navigateToBrain = () => router.push('/brain');
  const navigateToNeurotransmitters = () => router.push('/neurotransmitters');
  const navigateToEmotions = () => router.push('/emotions');

  const renderSectionHeader = (title: string, onPress: () => void) => (
    <TouchableOpacity style={styles.sectionHeader} onPress={onPress} activeOpacity={0.6}>
      <Text style={styles.title}>{title}</Text>
      <ArrowRight color="#000" size={22} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <TouchableOpacity style={styles.menuButton} onPress={openDrawer} activeOpacity={0.7}>
        <FontAwesome name="bars" size={22} color={colors.surfaceDark} />
      </TouchableOpacity>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={[styles.brainCard, { width: Dimensions.get('window').width - 40, height: 200 }]} />
        </View>

        {/* Partes do cérebro */}
        <View style={styles.brainPartsContainer}>
          {renderSectionHeader('Partes do cérebro', navigateToBrain)}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brainPartsScroll}>
            {BRAIN_PARTS.map((brainPart) => (
              <BrainPartCard
                key={brainPart.id}
                name={brainPart.name}
                icon={brainPart.icon}
                onPress={() =>
                  router.push(`/chapters?tipo=partes-cerebro&id=${brainPart.id}&name=${encodeURIComponent(brainPart.name)}&from=home`)
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* Neurotransmissores */}
        <View style={styles.neurotransmittersContainer}>
          {renderSectionHeader('Neurotransmissores', navigateToNeurotransmitters)}
          <View style={styles.neurotransmittersGrid}>
            <View style={styles.column}>
              {NEUROTRANSMITTERS.slice(0, 3).map((n) => (
                <NeurotransmitterCard
                  key={n.id}
                  name={n.name}
                  icon={n.id}
                  iconColor={n.color}
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
                  icon={n.id}
                  iconColor={n.color}
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
          {renderSectionHeader('Emoções', navigateToEmotions)}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.emotionsScroll}>
            {EMOTIONS.map((emotion) => (
              <EmotionCard
                key={emotion.id}
                name={emotion.name}
                category={emotion.category}
                icon={emotion.icon}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
  },
  menuButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1000,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  headerCard: {
    marginTop: 120,
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
    color: '#000',
    paddingRight: 5

  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
