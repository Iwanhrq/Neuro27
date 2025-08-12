import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ForgotPasswordButton, ForgotPasswordHeader, ForgotPasswordInput } from '../../../components';

export default function ForgotPasswordEmail() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ForgotPasswordHeader />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Redefinir senha</Text>
        <Text style={styles.subtitle}>
        Digite o e-mail vinculado à sua conta para que possamos enviar um código de verificação e permitir a redefinição da sua senha.
        </Text>

        {/* Campo de email */}
        <ForgotPasswordInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Botão no final da página */}
      <ForgotPasswordButton 
        title="Enviar email" 
        onPress={() => router.push('(panel)/ForgotPassword/ForgotPasswordCode' as any)}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001C2A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
