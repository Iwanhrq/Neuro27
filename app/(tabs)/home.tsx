import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import dopaminImage from '../../assets/images/dopamin.png';
import serotoninImage from '../../assets/images/serotonin.png';
import { EmotionCard, HomeHeaderCard, NeurotransmitterCard } from '../../components';
import BrainPartCard from '../../components/BrainPartCard';
import { fontFamily } from '@/constants/fonts';
import colors from '@/constants/colors';

// Dados estáticos dos neurotransmissores
const NEUROTRANSMITTERS = [
  { id: 'dopamina', name: 'Dopamina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: dopaminImage },
  { id: 'serotonina', name: 'Serotonina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: serotoninImage },
  { id: 'acetilcolina', name: 'Acetilcolina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: dopaminImage },
  { id: 'gaba', name: 'GABA', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: serotoninImage },
  { id: 'glutamato', name: 'Glutamato', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: dopaminImage },
  { id: 'noradrenalina', name: 'Noradrenalina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: dopaminImage },
];

// Dados estáticos das partes do cérebro
const BRAIN_PARTS = [
  { id: 'cerebro', name: 'Cérebro' },
  { id: 'cerebelo', name: 'Cerebelo' },
  { id: 'tronco', name: 'Tronco Cerebral' },
  { id: 'hipotalamo', name: 'Hipotálamo' },
  { id: 'amigdala', name: 'Amígdala' },
];

// Dados estáticos das emoções
const EMOTIONS = [
  { id: 'alegria', name: 'Alegria', category: 'Positiva' },
  { id: 'tristeza', name: 'Tristeza', category: 'Negativa' },
  { id: 'raiva', name: 'Raiva', category: 'Negativa' },
  { id: 'medo', name: 'Medo', category: 'Negativa' },
  { id: 'amor', name: 'Amor', category: 'Positiva' },
];

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/(panel)/login');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/*<LogoutButton onPress={handleLogout} />*/}

      <HomeHeaderCard title="" />

      {/* Cards das Partes do Cérebro */}
      <View style={styles.brainPartsContainer}>
        <Text style={styles.title}>Partes do cérebro</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.brainPartsScroll}
        >
          {BRAIN_PARTS.map((brainPart) => (
            <BrainPartCard
              key={brainPart.id}
              name={brainPart.name}
              onPress={() => router.push(`/chapters?tipo=partes-cerebro&id=${brainPart.id}&from=home`)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Grid dos Neurotransmissores */}
      <View style={styles.neurotransmittersContainer}>
        <Text style={styles.title}>Neurotransmissores</Text>
        <View style={styles.neurotransmittersGrid}>
          <View style={styles.column}>
            {NEUROTRANSMITTERS.slice(0, 3).map((neurotransmitter) => (
              <NeurotransmitterCard
                key={neurotransmitter.id}
                name={neurotransmitter.name}
                onPress={() => router.push(`/chapters?tipo=neurotransmissores&id=${neurotransmitter.id}&from=home`)}
              />
            ))}
          </View>
          <View style={styles.column}>
            {NEUROTRANSMITTERS.slice(3, 6).map((neurotransmitter) => (
              <NeurotransmitterCard
                key={neurotransmitter.id}
                name={neurotransmitter.name}
                onPress={() => router.push(`/chapters?tipo=neurotransmissores&id=${neurotransmitter.id}&from=home`)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Cards das Emoções */}
      <View style={styles.emotionsContainer}>
        <Text style={styles.title}>Emoções</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.emotionsScroll}
        >
          {EMOTIONS.map((emotion) => (
            <EmotionCard
              key={emotion.id}
              name={emotion.name}
              category={emotion.category}
              onPress={() => router.push(`/chapters?tipo=emocoes&id=${emotion.id}&from=home`)}
            />
          ))}
        </ScrollView>
      </View>



      {/* Espaço extra no final para garantir que todos os cards sejam visíveis */}
      <View style={{ height: 50 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
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
