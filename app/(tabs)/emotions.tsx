import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContentCard, HeaderCard } from '../../components';

// Dados estáticos das emoções
const EMOTIONS = [
  { id: '1', name: 'Alegria', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '2', name: 'Tristeza', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '3', name: 'Raiva', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '4', name: 'Medo', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '5', name: 'Amor', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
];

export default function EmotionsScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Carrossel das Emoções */}
        <HeaderCard title="Emoções" />

        {/* Lista de emoções */}
        <View style={styles.brainContainer}>
          <Text style={styles.brainTitle}>
            Principais emoções
          </Text>

          {EMOTIONS.map((emotion) => (
            <ContentCard
              key={emotion.id}
              title={emotion.name}
              description={emotion.info}
              onPress={() => router.push(`/chapters?tipo=emocoes&id=${emotion.name.toLowerCase()}`)}
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
    padding: 20,
    backgroundColor: '#fff',
  },
  brainContainer: {
    marginTop: 30
  },
  brainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
  },
});
