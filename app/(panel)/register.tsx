import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthLayout, CustomButton, CustomInput } from '../../components';
import { register as firebaseRegister } from '../../constants/auth';
import { fontFamily } from '../../constants/fonts';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    // Regex simples para validar email
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      // Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (!validateEmail(email)) {
      // Alert.alert('Erro', 'Email inválido');
      return;
    }
    if (password.length < 6) {
      // Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      // Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    try {
      await firebaseRegister(email, password, name);
      // Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.push('/(panel)/login' as any);
    } catch (error: any) {
      // let message = 'Erro ao criar conta';
      // if (error.code === 'auth/email-already-in-use') message = 'Email já está em uso';
      // if (error.code === 'auth/invalid-email') message = 'Email inválido';
      // if (error.code === 'auth/weak-password') message = 'Senha muito fraca';
      // Alert.alert('Erro', message);
    }
  };

  return (
    <AuthLayout showLogo={false} headerText="" headerHeight={175} showBackButton={true}>
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>
        Desperte sua curiosidade sobre
        a {'\n'}mente
      </Text>
      <View style={styles.form}>
        <CustomInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          width="90%"
        />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          width="90%"
        />

        <CustomInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          width="90%"
        />

        <CustomInput
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          width="90%"
        />

        <CustomButton title="Cadastrar" onPress={handleRegister} width="90%" />

{/*/
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.back()}
        >
          <Text style={styles.linkText}>
            Já possui uma conta?
            <Text style={styles.colorfulText}> Faça login</Text>
          </Text>
        </TouchableOpacity>

        */}
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: fontFamily.semibold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    opacity: 0.5,
    marginBottom: 50
  },
  form: {
    alignItems: 'center',
    width: '100%',
    // gap: 32, // Removido para usar marginBottom individual
  },
  linkButton: {
    alignItems: 'center',
    paddingTop: 64,
  },
  linkText: {
    fontSize: 14,
  },
  colorfulText: {
    color: '#A283C8'
  },
});
