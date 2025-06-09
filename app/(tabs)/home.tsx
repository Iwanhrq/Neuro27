import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Lista estática de neurotransmissores
const NEUROTRANSMITTERS = [
  { id: 'serotonin', name: 'Serotonina' },
  { id: 'dopamine', name: 'Dopamina' },
  { id: 'norepinephrine', name: 'Noradrenalina' },
  { id: 'gaba', name: 'GABA' },
  { id: 'glutamate', name: 'Glutamato' },
  { id: 'acetylcholine', name: 'Acetilcolina' },
  { id: 'endorphin', name: 'Endorfina' },
  { id: 'histamine', name: 'Histamina' },
];

// Lista estática de emoções (provisória)
const EMOTIONS = [
  { 
    id: '1',
    name: 'Alegria',
    category: 'Positiva',
  },
  { 
    id: '2',
    name: 'Tristeza',
    category: 'Negativa',
  },
  { 
    id: '3',
    name: 'Raiva',
    category: 'Negativa',
  },
  { 
    id: '4',
    name: 'Medo',
    category: 'Negativa',
  },
  { 
    id: '5',
    name: 'Amor',
    category: 'Positiva',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.storiesContainer}>
        <Text style={styles.storiesTitle}>Neurotransmissores</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesScroll}
        >
          {NEUROTRANSMITTERS.map((neurotransmitter) => (
            <TouchableOpacity
              key={neurotransmitter.id}
              style={styles.storyCard}
              onPress={() => router.push(`/neurotransmitter/${neurotransmitter.id}`)}
            >
              <View style={styles.storyCircle}>
              </View>
              <Text style={styles.storyName} numberOfLines={1}>
                {neurotransmitter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.emotionsContainer}>
        <Text style={styles.emotionsTitle}>Emoções</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.emotionsScroll}
        >
          {EMOTIONS.map((emotion) => (
            <TouchableOpacity
              key={emotion.id}
              style={styles.emotionCard}
            >
              <View style={styles.emotionImageContainer}>
              </View>
              <View style={styles.emotionInfo}>
                <Text style={styles.emotionCategory}>{emotion.category}</Text>
                <Text style={styles.emotionName}>{emotion.name}</Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: '#fff',
  },
  storiesContainer: {
    marginTop: 60,
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
  storyCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  storyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D0E5FB',
  },
  storyInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
    color: '#001B29',
    textAlign: 'center',
  },



  emotionsContainer: {
    marginTop: 40,
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
  emotionCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 1,
  },
  emotionImageContainer: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#ABD4FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionInitial: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#001B29',
  },
  emotionInfo: {
    padding: 12,
  },
  emotionCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  emotionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001B29',
  },
}); 