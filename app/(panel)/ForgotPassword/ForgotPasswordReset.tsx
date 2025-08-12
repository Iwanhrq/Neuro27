import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ForgotPasswordButton, ForgotPasswordHeader, ForgotPasswordInput } from '../../../components';

export default function ForgotPasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ForgotPasswordHeader />

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
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Campo de confirmação de senha */}
        <ForgotPasswordInput
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Botão */}
        <ForgotPasswordButton 
          title="Redefinir senha" 
          onPress={() => router.push('(panel)/ForgotPassword/ForgotPasswordCode' as any)}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001C2A',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    paddingTop: 40,
  },
});
