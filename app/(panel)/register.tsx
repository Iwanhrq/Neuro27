import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { register as firebaseRegister } from '../../constants/auth';

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
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    try {
      await firebaseRegister(email, password);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.push('/(panel)/login' as any);
    } catch (error: any) {
      let message = 'Erro ao criar conta';
      if (error.code === 'auth/email-already-in-use') message = 'Email já está em uso';
      if (error.code === 'auth/invalid-email') message = 'Email inválido';
      if (error.code === 'auth/weak-password') message = 'Senha muito fraca';
      Alert.alert('Erro', message);
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
          <Text style={styles.headerText}>Bem-vindo(a)!</Text>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.title}>Cadastre-se</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

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

            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => router.back()}
            >
              <Text style={styles.linkText}>Já possui uma conta?
                <Text style={styles.colorfulText}> Faça login</Text>
              </Text>
            </TouchableOpacity>
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
    height: 175,
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
  },
  linkText: {
    fontSize: 14,
    paddingTop: 64
  },
}); 