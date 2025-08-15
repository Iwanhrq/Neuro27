import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContentCard, HeaderCard } from '../../components';

// Dados estáticos das partes do cérebro
const BRAIN_PARTS = [
  { id: 'cérebro_emocional', name: 'O que é o cérebro emocional?', info: 'Entenda quais áreas do cérebro cuidam das emoções e como elas se conectam para te ajudar a reagir, lembrar e se adaptar.' },
  { id: 'sistema_limbico', name: 'Sistema Límbico: o centro das emoções básicas', info: 'Aprenda o que é o sistema límbico e por que ele é tão importante para emoções como medo, alegria e tristeza.' },
  { id: 'amigdala', name: 'Amígdala: o alarme de emergência do cérebro', info: 'Descubra como essa pequena estrutura identifica ameaças e ativa reações como medo, raiva ou fuga.' },
  { id: 'hipocampo', name: 'Hipocampo: onde memórias e emoções se encontram', info: 'Veja como o cérebro usa memórias emocionais para reconhecer situações e decidir o que sentir.' },
];

export default function BrainPartsScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Carrossel das Partes do Cérebro */}
        <HeaderCard variant="dark" />

        {/* Lista de partes do cérebro */}
        <View style={styles.brainContainer}>
          <Text style={styles.brainTitle}>
            Partes do cérebro
          </Text>

          {BRAIN_PARTS.map((brainpart) => (
            <ContentCard
              key={brainpart.id}
              title={brainpart.name}
              description={brainpart.info}
              onPress={() => router.push(`/chapters?tipo=partesCerebro&id=${brainpart.id}&from=brain`)}
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
    backgroundColor: '#fff',
  },
  brainContainer: {
    marginTop: 230,
    padding: 20,
  },
  brainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
    paddingBottom: 20,
  },
});
