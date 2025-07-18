import { useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from 'react-native';

// Dados estáticos das partes do cérebro
const BRAIN_PARTS = [
  { id: '1', name: 'O que é o cérebro emocional?', info: 'Entenda quais áreas do cérebro cuidam das emoções e como elas se conectam para te ajudar a reagir, lembrar e se adaptar. ' },
  { id: '2', name: 'Sistema Límbico: o centro das emoções básicas', info: 'Aprenda o que é o sistema límbico e por que ele é tão importante para emoções como medo, alegria e tristeza. ' },
  { id: '3', name: 'Amígdala: o alarme de emergência do cérebro', info: 'Descubra como essa pequena estrutura identifica ameaças e ativa reações como medo, raiva ou fuga.' },
  { id: '4', name: 'Hipocampo: onde memórias e emoções se encontram', info: 'Veja como o cérebro usa memórias emocionais para reconhecer situações e decidir o que sentir.' },
];

export default function BrainPartsScreen() {
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
      <View>
        <View style={styles.carouselWrapper}>
          <View style={[styles.brainCard, { width: screenWidth - 40 }]}>
            <Text style={styles.brainName}>Cérebro 3D</Text>
          </View>
        </View>
      </View>

      {/* Lista de partes do cérebro */}
      <View style={styles.brainContainer}>
        <Text style={styles.brainTitle}>
          Partes do cérebro
        </Text>

        {BRAIN_PARTS.map((brainpart) => (
          <View style={styles.brainPartCard}
            key={brainpart.id}
          >
            <View style={styles.brainImageContainer}></View>
            <View style={styles.brainInfo}>
              <Text style={styles.brainPartTitle}>{brainpart.name}</Text>
              <Text style={styles.brainPartText}>{brainpart.info}</Text>
            </View>
          </View>
        ))}

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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#001B29',
    textAlign: 'center',
    marginTop: 20,
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
