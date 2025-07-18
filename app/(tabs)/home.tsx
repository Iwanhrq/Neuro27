import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


// Dados estáticos dos neurotransmissores
const NEUROTRANSMITTERS = [
  { id: 'serotonin', name: 'Serotonina', image: require('../../assets/images/serotonina.png') },
  { id: 'dopamine', name: 'Dopamina', image: require('../../assets/images/dopamina.png') },
  { id: 'noradrenaline', name: 'Noradrenalina', image: require('../../assets/images/serotonina.png') },
  { id: 'gaba', name: 'GABA', image: require('../../assets/images/dopamina.png') },
];

// Dados estáticos das emoções
const EMOTIONS = [
  { id: '1', name: 'Alegria', category: 'Positiva' },
  { id: '2', name: 'Tristeza', category: 'Negativa' },
  { id: '3', name: 'Raiva', category: 'Negativa' },
  { id: '4', name: 'Medo', category: 'Negativa' },
  { id: '5', name: 'Amor', category: 'Positiva' },
];

export default function Home() {
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const router = useRouter();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (screenWidth - 40));
    setActiveIndex(index);
  };

  const handleLogout = () => {
    // Aqui você pode adicionar sua lógica de signOut (ex: Firebase)
    // Após o signOut, redirecione para a tela de login
    router.replace('/(panel)/login');
  };

  return (
    <View style={styles.container}>
      {/* Botão de Logoff com Ícone */}
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} accessibilityLabel="Sair">
          <MaterialIcons name="logout" size={28} color="#001B29" />
        </TouchableOpacity>
      </View>
      {/* Carrossel das Partes do Cérebro */}
      <View>
        <View style={styles.carouselWrapper}>
          <View style={[styles.brainCard, { width: screenWidth - 40 }]}> 
            <Text style={styles.brainName}>Cérebro 3D</Text>
          </View>
        </View>
      </View>

      {/* Stories dos Neurotransmissores */}
      <View style={styles.storiesContainer}>
        <Text style={styles.storiesTitle}>Neurotransmissores</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesScroll}
        >
          {NEUROTRANSMITTERS.map((neurotransmitter) => (
            <View
              key={neurotransmitter.id}
              style={styles.storyCard}
            >
              <View style={styles.storyCircle} />
              <Text style={styles.storyName} numberOfLines={1}>
                {neurotransmitter.name}
              </Text>
            </View>
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
            <View
              key={emotion.id}
              style={styles.emotionCard}
            >
              <View style={styles.emotionImageContainer} />
              <View style={styles.emotionInfo}>
                <Text style={styles.emotionCategory}>{emotion.category}</Text>
                <Text style={styles.emotionName}>{emotion.name}</Text>
              </View>
            </View>
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
  logoutButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  logoutButton: {
    paddingTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  carouselWrapper: {
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
  storyCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 90,
  },
  storyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D0E5FB',
    overflow: 'hidden',
  },
  storyImage: {
    width: '65%',
    height: '65%',
    borderRadius: 20,
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
    color: '#001B29',
    textAlign: 'center',
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
  emotionCard: {
    width: 160,
    marginRight: 15,
    marginBottom: 16, // Espaço para a sombra aparecer
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#D0E5FB',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#001B29',
    width: 8,
    height: 8,
    borderRadius: 6,
  },
}); 