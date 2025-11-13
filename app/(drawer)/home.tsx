import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import dopaminImage from '../../assets/images/dopamin.png';
import logoImage from '../../assets/images/logo.png';
import serotoninImage from '../../assets/images/serotonin.png';
import { EmotionCard, NeurotransmitterCard } from '../../components';
import BrainPartCard from '../../components/BrainPartCard';


// ----------------------------------------------------------------------
// Dados fixos exibidos na Home
// ----------------------------------------------------------------------

const NEUROTRANSMITTERS = [
  // Cada item representa um neurotransmissor mostrado na Home
  { id: 'dopamina', name: 'Dopamina', info: 'Lorem ipsum...', image: dopaminImage, color: colors.brand },
  { id: 'serotonina', name: 'Serotonina', info: 'Lorem ipsum...', image: serotoninImage, color: colors.accentPurple },
  { id: 'acetilcolina', name: 'Acetilcolina', info: 'Lorem ipsum...', image: dopaminImage, color: colors.brandLight },
  { id: 'gaba', name: 'GABA', info: 'Lorem ipsum...', image: serotoninImage, color: colors.accentPurpleDark },
  { id: 'glutamato', name: 'Glutamato', info: 'Lorem ipsum...', image: dopaminImage, color: colors.brand },
  { id: 'adrenalina', name: 'Adrenalina', info: 'Lorem ipsum...', image: dopaminImage, color: colors.accentPurple },
];

const BRAIN_PARTS = [
  // Partes do cérebro mostradas na sessão horizontal
  { id: 'cerebro', name: 'Cérebro', icon: 'cerebro' },
  { id: 'sistema_limbico', name: 'Sistema Límbico', icon: 'sistema_limbico' },
  { id: 'amigdala', name: 'Amígdala', icon: 'amigdala' },
  { id: 'hipocampo', name: 'Hipocampo', icon: 'hipocampo' },
];

const EMOTIONS = [
  // Emoções mostradas na sessão horizontal
  { id: 'alegria', name: 'Alegria', category: 'Positiva', icon: 'alegria' },
  { id: 'tristeza', name: 'Tristeza', category: 'Negativa', icon: 'tristeza' },
  { id: 'raiva', name: 'Raiva', category: 'Negativa', icon: 'raiva' },
  { id: 'medo', name: 'Medo', category: 'Negativa', icon: 'medo' },
  { id: 'amor', name: 'Amor', category: 'Positiva', icon: 'amor' },
];


// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------

export default function Home() {
  const router = useRouter();
  const navigation = useNavigation();

  // Abre o menu lateral (Drawer Navigation)
  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  // Navega para as páginas principais
  const navigateToBrain = () => router.push('/brain');
  const navigateToNeurotransmitters = () => router.push('/neurotransmitters');
  const navigateToEmotions = () => router.push('/emotions');

  // Renderiza o título da seção com botão ">" para ver mais
  const renderSectionHeader = (title: string, onPress: () => void) => (
    <TouchableOpacity
      style={styles.sectionHeader}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text style={styles.title}>{title}</Text>
      <ArrowRight color="#000" size={22} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>

      {/* Botão do menu lateral */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={openDrawer}
        activeOpacity={0.7}
      >
        <FontAwesome name="bars" size={22} color={colors.surfaceDark} />
      </TouchableOpacity>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >

          {/* CARD DO TOPO — LOGO + TEXTO */}
          <View style={styles.headerCard}>
            <View
              style={[
                styles.brainCard,
                { width: Dimensions.get('window').width - 40, height: 200 }
              ]}
            >
              <View style={styles.headerContent}>

                {/* Logo */}
                <Image
                  source={logoImage}
                  style={styles.logoImage}
                  contentFit="contain"
                />

                <View style={styles.textContainer}>
                  <Text style={styles.headerTitle}>Neuro27</Text>

                  {/* Subtítulo introdutório */}
                  <Text style={styles.headerSubtitle}>
                    Entenda o funcionamento do cérebro de forma simples e interativa
                  </Text>
                </View>

              </View>
            </View>
          </View>


          {/* ---------------------------------------------------------------- */}
          {/* PARTES DO CÉREBRO */}
          {/* ---------------------------------------------------------------- */}
          <View style={styles.brainPartsContainer}>
            {renderSectionHeader('Partes do cérebro', navigateToBrain)}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.brainPartsScroll}
            >
              {BRAIN_PARTS.map((brainPart) => (
                <BrainPartCard
                  key={brainPart.id}
                  name={brainPart.name}
                  icon={brainPart.icon}
                  onPress={() =>
                    router.push(
                      `/chapters?tipo=partesCerebro&id=${brainPart.id}&name=${encodeURIComponent(brainPart.name)}&from=home`
                    )
                  }
                />
              ))}
            </ScrollView>
          </View>


          {/* ---------------------------------------------------------------- */}
          {/* NEUROTRANSMISSORES */}
          {/* ---------------------------------------------------------------- */}
          <View style={styles.neurotransmittersContainer}>
            {renderSectionHeader('Neurotransmissores', navigateToNeurotransmitters)}

            <View style={styles.neurotransmittersGrid}>

              {/* Coluna 1 */}
              <View style={styles.column}>
                {NEUROTRANSMITTERS.slice(0, 3).map((n) => (
                  <NeurotransmitterCard
                    key={n.id}
                    name={n.name}
                    icon={n.id}
                    iconColor={n.color}
                    onPress={() =>
                      router.push(
                        `/chapters?tipo=neurotransmissores&id=${n.id}&name=${encodeURIComponent(n.name)}&from=home`
                      )
                    }
                  />
                ))}
              </View>

              {/* Coluna 2 */}
              <View style={styles.column}>
                {NEUROTRANSMITTERS.slice(3, 6).map((n) => (
                  <NeurotransmitterCard
                    key={n.id}
                    name={n.name}
                    icon={n.id}
                    iconColor={n.color}
                    onPress={() =>
                      router.push(
                        `/chapters?tipo=neurotransmissores&id=${n.id}&name=${encodeURIComponent(n.name)}&from=home`
                      )
                    }
                  />
                ))}
              </View>

            </View>
          </View>


          {/* ---------------------------------------------------------------- */}
          {/* EMOÇÕES */}
          {/* ---------------------------------------------------------------- */}
          <View style={styles.emotionsContainer}>
            {renderSectionHeader('Emoções', navigateToEmotions)}

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
                  icon={emotion.icon}
                  onPress={() =>
                    router.push(
                      `/chapters?tipo=emocoes&id=${emotion.id}&name=${encodeURIComponent(emotion.name)}&from=home`
                    )
                  }
                />
              ))}
            </ScrollView>
          </View>

          <View style={{ height: 50 }} />

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


// ----------------------------------------------------------------------
// STYLES (somente organização visual — sem comentários específicos)
// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
  },

  menuButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1000,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.outline,
  },

  headerCard: {
    marginTop: 120,
  },

  brainCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  logoImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },

  textContainer: {
    flex: 1,
    marginLeft: 5,
  },

  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 40,
    color: colors.textOnDark,
  },

  headerSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textOnDark,
    lineHeight: 18,
    opacity: 0.9,
  },

  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    color: '#000',
    paddingRight: 5
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  brainPartsContainer: {
    marginTop: 30,
  },

  brainPartsScroll: {
    paddingRight: 20,
  },

  emotionsContainer: {
    marginTop: 30,
  },

  emotionsScroll: {
    paddingRight: 20,
  },

  neurotransmittersContainer: {
    marginTop: 30,
  },

  neurotransmittersGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  column: {
    flex: 1,
    marginHorizontal: 5,
  },
});
