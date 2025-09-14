import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthLayout, CustomButton, CustomInput } from '../../components';
import { login as firebaseLogin } from '../../constants/auth';
import colors from '../../constants/colors';
import { fontFamily } from '../../constants/fonts';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      // Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (!validateEmail(email)) {
      // Alert.alert('Erro', 'Email inválido');
      return;
    }
    try {
      await firebaseLogin(email, password);
      router.push('/(tabs)/home' as any);
    } catch (error: any) {
      // let message = 'Email ou senha incorretos';
      // if (error.code === 'auth/invalid-email') message = 'Email inválido';
      // if (error.code === 'auth/user-not-found') message = 'Usuário não encontrado';
      // if (error.code === 'auth/wrong-password') message = 'Senha incorreta';
      // Alert.alert('Erro', message);
    }
  };

  return (
    <AuthLayout showLogo={true} showBackButton={true}>
      <Text style={styles.title}>Faça Login</Text>
      <Text style={styles.subtitle}>
        Sua mente te espera.
        Continue {'\n'}aprendendo
      </Text>
      <View style={styles.form}>
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
          marginBottom={0}
          width="90%"
        />

        <TouchableOpacity 
          style={styles.forgotPasswordContainer}
          onPress={() => router.push('/(panel)/ForgotPassword/ForgotPasswordEmail' as any)}
        >
          <Text style={[styles.colorfulText, { marginTop: 4, marginBottom: 32 }]}>
            Esqueceu a senha?
          </Text>
        </TouchableOpacity>


        <CustomButton title="Entrar" onPress={handleLogin} width="90%" />

        {/*
        <Link href="/(panel)/register" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>
              Não possui uma conta ainda?
              <Text style={styles.colorfulText}> Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </Link>

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
    // gap: 32, // Removido para usar marginBottom individual
  },
  forgotPasswordContainer: {
    width: '90%',
    alignItems: 'flex-end', // alinha à direita
  },

  linkButton: {
    alignItems: 'center',
    paddingTop: 128,
  },
  linkText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    opacity: 0.5,
  },
  colorfulText: {
    color: colors.purple
  },
});
