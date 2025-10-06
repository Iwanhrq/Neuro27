import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ForgotPasswordInput } from '../../../components';

export default function ForgotPasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Criar nova senha</Text>
        <Text style={styles.subtitle}>
          Sua nova senha deve ser diferente de suas senhas anteriores.
        </Text>

        {/* Campo de senha */}
        <ForgotPasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          rightIcon={
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <EyeOff color={colors.textSecondary} size={22} />
              ) : (
                <Eye color={colors.textSecondary} size={22} />
              )}
            </TouchableOpacity>
          }
        />

        {/* Campo de confirmação de senha */}
        <ForgotPasswordInput
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
          autoCapitalize="none"
          rightIcon={
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              {isConfirmPasswordVisible ? (
                <EyeOff color={colors.textSecondary} size={22} />
              ) : (
                <Eye color={colors.textSecondary} size={22} />
              )}
            </TouchableOpacity>
          }
        />

        {/* Botão */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.replace('/(panel)/login' as any)}
          >
            <Text style={styles.buttonText}>Redefinir senha</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 28,
    color: colors.textOnDark,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textOnDark,
    opacity: 0.8,
    marginBottom: 40,
    lineHeight: 22,
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
    paddingTop: 40,
  },
  button: {
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.button,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary,
  },
});
