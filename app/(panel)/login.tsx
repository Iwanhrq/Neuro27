import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { login as firebaseLogin } from '../../constants/auth';

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
    <SafeAreaView
      style={styles.container}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ImageBackground
            source={require('../../assets/images/fundo.png')}
            style={[styles.header]}
            resizeMode="cover"
          >
            <Image
              style={styles.logo}
              source={require('../../assets/images/logo.png')}
            />
            <Text style={styles.headerText}>Neuro27</Text>
          </ImageBackground>

          <View style={styles.block}>
            <View style={styles.content}>
              <Text style={styles.title}>Login</Text>

              <View style={styles.form}>
                <TextInput
                  style={[styles.input, { marginBottom: 32 }]}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <TextInput
                  style={[styles.input, { marginBottom: 0 }]}
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <TouchableOpacity>
                  <Text style={[styles.colorfulText, { marginTop: 4, marginBottom: 32, paddingLeft: 2 }]}>Esqueceu a senha</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Link href="/(panel)/register" asChild>
                  <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkText}>Não possui uma conta ainda?
                      <Text style={styles.colorfulText}> Cadastre-se</Text>
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 280,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 25,
    marginBottom: -15,
    width: 185,
    height: 180,
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
  },
  block: {
    backgroundColor: "#001B2A"
  },
  content: {
    paddingTop: 75,
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F8FB',
    borderTopLeftRadius: 80,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    // gap: 32, // Removido para usar marginBottom individual
  },
  input: {
    height: 45,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 32, // Adicionado espaçamento entre inputs
  },
  button: {
    height: 45,
    backgroundColor: '#ABD4FC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkButton: {
    alignItems: 'center',
    paddingTop: 128,
  },
  linkText: {
    fontSize: 14,
  },
  colorfulText: {
    color: '#A283C8'
  },
});
