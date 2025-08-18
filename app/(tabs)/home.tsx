import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import dopaminImage from '../../assets/images/dopamin.png';
import serotoninImage from '../../assets/images/serotonin.png';
import { EmotionCard, HomeHeaderCard, StoryCard } from '../../components';

// Dados estáticos dos neurotransmissores
const NEUROTRANSMITTERS = [
  { id: 'dopamina', name: 'Dopamina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: dopaminImage },
  { id: 'serotonina', name: 'Serotonina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: serotoninImage },
  { id: 'acetilcolina', name: 'Acetilcolina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: dopaminImage },
  { id: 'gaba', name: 'GABA', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: serotoninImage },
  { id: 'glutamato', name: 'Glutamato', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.', image: dopaminImage },
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
    <View style={styles.container}>

      {/*<LogoutButton onPress={handleLogout} />*/}

      {/* Carrossel das Partes do Cérebro */}
      <HomeHeaderCard title="Cérebro 3D" />

      {/* Stories dos Neurotransmissores */}
      <View style={styles.storiesContainer}>
        <Text style={styles.storiesTitle}>Neurotransmissores</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesScroll}
        >
          {NEUROTRANSMITTERS.map((neurotransmitter) => (
            <StoryCard
              key={neurotransmitter.id}
              name={neurotransmitter.name}
              onPress={() => router.push(`/chapters?tipo=neurotransmissores&id=${neurotransmitter.id}&from=home`)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Cards das Emoções */}
      <View style={styles.emotionsContainer}>
        <Text style={styles.emotionsTitle}>Emoções</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FBFBFB',
  },
  storiesContainer: {
    marginTop: 30
  },
  storiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
    marginBottom: 15,
  },
  storiesScroll: {
    paddingRight: 20,
  },
  emotionsContainer: {
    marginTop: 30,
  },
  emotionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
    marginBottom: 15,
  },
  emotionsScroll: {
    paddingRight: 20,
  },
});
