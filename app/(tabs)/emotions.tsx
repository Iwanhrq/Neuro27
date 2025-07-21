import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados estáticos das emoções
const EMOTIONS = [
  { id: '1', name: 'Alegria', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '2', name: 'Tristeza', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '3', name: 'Raiva', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '4', name: 'Medo', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '5', name: 'Amor', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
];

export default function EmotionsScreen() {
  const screenWidth = Dimensions.get('window').width;
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Carrossel das Emoções */}
        <View>
          <View style={styles.carouselWrapper}>
            <View style={[styles.brainCard, { width: screenWidth - 40 }]}> 
              <Text style={styles.brainName}>Emoções</Text>
            </View>
          </View>
        </View>

        {/* Lista de emoções */}
        <View style={styles.brainContainer}>
          <Text style={styles.brainTitle}>
            Principais emoções
          </Text>

          {EMOTIONS.map((emotion) => (
            <TouchableOpacity
              style={styles.brainPartCard}
              key={emotion.id}
              onPress={() => router.push(`/chapters?tipo=emocoes&id=${emotion.name.toLowerCase()}`)}
            >
              <View style={styles.brainImageContainer}></View>
              <View style={styles.brainInfo}>
                <Text style={styles.brainPartTitle}>{emotion.name}</Text>
                <Text style={styles.brainPartText}>{emotion.info}</Text>
              </View>
            </TouchableOpacity>
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
  carouselWrapper: { 
    marginTop: 60,
    position: 'relative',
  },
  brainCard: {
    height: 200,
    marginRight: 20,
    backgroundColor: '#ABD4FC',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brainName: {
    color: '#001B29',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
  },
  brainContainer: {
    marginTop: 30
  },
  brainPartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingTop: 15
  },
  brainImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#ABD4FC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  brainInfo: {
    marginLeft: 16,
    flex: 1,
  },
  brainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
  },
  brainPartTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
    marginBottom: 4,
    textAlign: 'left',
  },
  brainPartText: {
    fontWeight: '300',
    fontSize: 12,
    color: '#333',
    textAlign: 'left',
  },
}); 