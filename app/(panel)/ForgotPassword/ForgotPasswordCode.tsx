import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ForgotPasswordCodeInputs, ForgotPasswordTimer } from '../../../components';

export default function ForgotPasswordCode() {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleVerify = () => {
    console.log('Código digitado:', code);
    router.push('(panel)/ForgotPassword/ForgotPasswordReset' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>Cheque seu inbox</Text>

        <Text style={styles.subtitle}>
          Nós enviamos um código de verificação{'\n'}
          em seu email (verifique a caixa de spam)
        </Text>

        {/* Inputs do código */}
        <ForgotPasswordCodeInputs onCodeChange={setCode} />

        {/* Timer */}
        <ForgotPasswordTimer />
      </View>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleVerify}
        >
          <Text style={styles.buttonText}>Verificar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Enviar novamente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDark,
  },
  content: {
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 28,
    color: colors.textOnDark,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textOnDark,
    marginBottom: 40,
    lineHeight: 22,
    opacity: 0.8,
    textAlign: 'center',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 55,
    paddingBottom: 20,
  },
  button: {
    height: 48,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.button,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary
  },
  secondaryButton: {
    height: 48,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonSecondary,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary
  },
});
