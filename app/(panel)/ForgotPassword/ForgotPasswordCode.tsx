import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ForgotPasswordButton, ForgotPasswordCodeInputs, ForgotPasswordHeader, ForgotPasswordTimer } from '../../../components';

export default function ForgotPasswordCode() {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleVerify = () => {
    console.log('Código digitado:', code);
    router.push('(panel)/ForgotPassword/ForgotPasswordReset' as any);
  };

  return (
    <View style={styles.container}>
      <ForgotPasswordHeader />

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
      <ForgotPasswordButton 
        title="Verificar" 
        onPress={handleVerify}
        containerStyle={styles.buttonContainer}
        borderRadius={20}
      />

      <ForgotPasswordButton 
        title="Enviar novamente" 
        variant="secondary"
        containerStyle={styles.buttonContainer}
        borderRadius={20}
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
    paddingTop: 40,
    alignItems: 'center',
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
    textAlign: 'center',
  },


  buttonContainer: {
    paddingHorizontal: 55,
    paddingBottom: 20,
  },
});
