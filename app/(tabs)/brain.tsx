import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContentCard } from '../../components';

// Dados estáticos das partes do cérebro
const BRAIN_PARTS = [
  { id: 'cérebro_emocional', name: 'O que é o cérebro emocional?', title: 'Cérebro Emocional', info: 'Entenda quais áreas do cérebro cuidam das emoções e como elas se conectam para te ajudar a reagir, lembrar e se adaptar.' },
  { id: 'sistema_limbico', name: 'Sistema Límbico: o centro das emoções básicas', title: 'Sistema Límbico', info: 'Aprenda o que é o sistema límbico e por que ele é tão importante para emoções como medo, alegria e tristeza.' },
  { id: 'amigdala', name: 'Amígdala: o alarme de emergência do cérebro', title: 'Amígdala', info: 'Descubra como essa pequena estrutura identifica ameaças e ativa reações como medo, raiva ou fuga.' },
  { id: 'hipocampo', name: 'Hipocampo: onde memórias e emoções se encontram', title: 'Hipocampo', info: 'Veja como o cérebro usa memórias emocionais para reconhecer situações e decidir o que sentir.' },
];



export default function BrainPartsScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Carrossel das Partes do Cérebro */}
        <View style={styles.headerCard}>
          <View style={[styles.brainCard, { width: Dimensions.get('window').width, height: 220 }]}>
          </View>
        </View>

        {/* Lista de partes do cérebro */}
        <View style={styles.brainContainer}>
          <Text style={styles.brainTitle}>
            Partes do cérebro
          </Text>

          {BRAIN_PARTS.map((brainpart) => (
            <ContentCard
              key={brainpart.id}
              title={brainpart.name} // título curto visível no card
              description={brainpart.info} // texto longo
              onPress={() => router.push(
                `/chapters?tipo=partesCerebro&id=${brainpart.id}&name=${encodeURIComponent(brainpart.title)}&from=brain`
              )}
              imageContainerColor={colors.brandLight}
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
    backgroundColor: colors.surface,
  },
  headerCard: {
    position: 'relative',
  },
  brainCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 0,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brainContainer: {
    marginTop: 10,
    padding: 20,
  },
  brainTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    paddingBottom: 20,
  },
});
