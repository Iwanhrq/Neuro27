import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados estáticos das partes do cérebro
const BRAIN_PARTS = [
  { id: 'cerebro_emocional', name: 'Cérebro Emocional', info: 'Entenda quais áreas do cérebro cuidam das emoções e como elas se conectam para te ajudar a reagir, lembrar e se adaptar.' },
  { id: 'sistema_limbico', name: 'Sistema Límbico', info: 'Aprenda o que é o sistema límbico e por que ele é tão importante para emoções como medo, alegria e tristeza.' },
  { id: 'amigdala', name: 'Amígdala', info: 'Descubra como essa pequena estrutura identifica ameaças e ativa reações como medo, raiva ou fuga.' },
  { id: 'hipocampo', name: 'Hipocampo', info: 'Veja como o cérebro usa memórias emocionais para reconhecer situações e decidir o que sentir.' },
];

export default function BrainPartsScreen() {
  const screenWidth = Dimensions.get('window').width;
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <TouchableOpacity
              style={styles.brainPartCard}
              key={brainpart.id}
              onPress={() => router.push(`/chapters?tipo=partesCerebro&id=${brainpart.id}`)}
            >
              <View style={styles.brainImageContainer}></View>
              <View style={styles.brainInfo}>
                <Text style={styles.brainPartTitle}>{brainpart.name}</Text>
                <Text style={styles.brainPartText}>{brainpart.info}</Text>
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
  brainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
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
