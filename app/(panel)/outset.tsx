import { useRouter } from 'expo-router';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import logoImage from '../../assets/images/logo.png';
import { fontFamily } from '@/constants/fonts';
import colors from '@/constants/colors';

const { width: screenWidth } = Dimensions.get('window');

export default function Outset() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={logoImage} 
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Onda invertida horizontalmente */}
        <Svg height="80" width={screenWidth} style={styles.wave}>
          <Path
            d={`
              M${screenWidth} 10 
              Q ${screenWidth * 0.75} 80, ${screenWidth * 0.5} 45 
              Q ${screenWidth * 0.25} 5, 0 50
            `}
            stroke={colors.wave} // Usando a cor da onda
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.title}>Neuro27</Text>
        <Text style={styles.subtitle}>
          Explore seu cérebro em profundidade. Compreenda como suas emoções nascem e se transformam.
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.buttonLogin} 
            onPress={() => router.push('/(panel)/login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.buttonRegister} 
            onPress={() => router.push('/(panel)/register')}
          >
            <Text style={styles.buttonText}>Cadastro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary, // Usando a cor de fundo
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 230,
    height: 230,
    marginTop: 100,
    marginBottom: -30
  },
  wave: {
    marginBottom: 20,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 36,
    color: colors.textLight, // Usando a cor de texto claro
    textAlign: 'center',
    marginBottom: 20
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textMuted, // Usando a cor de texto secundário
    textAlign: 'center',
    marginBottom: 50,
    maxWidth: 250
  },
  buttonContainer: {
    gap: 20,
    width: '100%',
    maxWidth: 300,
  },
  buttonLogin: {
    backgroundColor: colors.buttonPrimary, // Usando a cor do botão primário
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonRegister: {
    backgroundColor: colors.buttonSecondary, // Usando a cor do botão secundário
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fontFamily.semibold,
    color: colors.textDark, // Usando a cor de texto escuro
    fontSize: 16,
  },
});