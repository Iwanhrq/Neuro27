import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email === 'admin' && password === '1234') {
      // Login successful
      router.push('/(tabs)/home' as any);
    } else {
      // Login failed
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require('../../assets/images/Fundo-login.png')}
          style={styles.header}
          resizeMode="cover"
        >
          <Text style={styles.headerText}>Bem-vindo(a) de volta!</Text>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B29'
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    paddingTop: 25,
    color: '#fff',
    fontSize: 32,
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
    gap: 32,
  },
  input: {
    height: 45,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  colorfulText: {
    color: '#A283C8'
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
}); 