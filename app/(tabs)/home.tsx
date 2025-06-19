import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type NeurotransmitterId = 'serotonin' | 'dopamine' | 'norepinephrine' | 'gaba' | 'glutamate' | 'acetylcholine' | 'endorphin' | 'histamine';

// Mapeamento das imagens dos neurotransmissores
const NEUROTRANSMITTER_IMAGES: Record<NeurotransmitterId, any> = {
  serotonin: require('../../assets/images/serotonina.png'),
  dopamine: require('../../assets/images/dopamina.png'),
  norepinephrine: require('../../assets/images/serotonina.png'),
  gaba: require('../../assets/images/dopamina.png'),
  glutamate: require('../../assets/images/serotonina.png'),
  acetylcholine: require('../../assets/images/dopamina.png'),
  endorphin: require('../../assets/images/serotonina.png'),
  histamine: require('../../assets/images/dopamina.png'),
};

// Lista estática de neurotransmissores
const NEUROTRANSMITTERS: { id: NeurotransmitterId; name: string }[] = [
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

// Lista estática das partes do cérebro
const BRAIN_PARTS = [
  { id: '1', name: 'Córtex Cerebral' },
  { id: '2', name: 'Cerebelo' },
  { id: '3', name: 'Tronco Encefálico' },
  { id: '4', name: 'Sistema Límbico' },
];

export default function Home() {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (screenWidth - 40));
    setActiveIndex(index);
  };

  return (

    <View style={styles.container}>
      {/* Carrossel das Partes do Cérebro */}
      <View style={styles.brainCarouselContainer}>
        <View style={styles.carouselWrapper}>
          <ScrollView 
            ref={scrollViewRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={screenWidth - 40}
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.brainCarouselScroll}
          >
            {BRAIN_PARTS.map((part) => (
              <TouchableOpacity
                key={part.id}
                style={[styles.brainPartCard, { width: screenWidth - 40 }]}
              >
                <Text style={styles.brainPartName}>{part.name}</Text>
                <View style={styles.pagination}>
                  {BRAIN_PARTS.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        index === activeIndex && styles.paginationDotActive
                      ]}
                    />
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/*Stories dos Neurotransmissores*/}
      <View style={styles.storiesContainer}>
        <Text style={styles.storiesTitle}>#</Text>
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
                <Image 
                  source={NEUROTRANSMITTER_IMAGES[neurotransmitter.id]}
                  style={styles.storyImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.storyName} numberOfLines={1}>
                {neurotransmitter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/*Cards das Emoções*/}
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
  brainCarouselContainer: {
    marginTop: 60,
  },
  brainCarouselScroll: {
    paddingRight: 20,
  },
  carouselWrapper: {
    position: 'relative',
  },
  brainPartCard: {
    height: 200,
    marginRight: 20,
    backgroundColor: '#ABD4FC',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brainPartName: {
    color: '#001B29',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
  },
  storiesContainer: {
    marginTop: 30,
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