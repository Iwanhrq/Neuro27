import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthLayout, CustomInput } from '../../components';
import { login as firebaseLogin } from '../../constants/auth';
import colors from '../../constants/colors';
import { fontFamily } from '../../constants/fonts';
import { LoginFormData, loginSchema } from '../../constants/validation';

export default function Login() {
  const router = useRouter();
  
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      await firebaseLogin(data.email, data.password);
      router.push('/(tabs)/home' as any);
    } catch (error: any) {
      let message = 'Email ou senha incorretos';
      let field: keyof LoginFormData = 'email';
      
      if (error.code === 'auth/invalid-email') {
        message = 'Email inválido';
        field = 'email';
      } else if (error.code === 'auth/user-not-found') {
        message = 'Usuário não encontrado';
        field = 'email';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Senha incorreta';
        field = 'password';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'Email ou senha incorretos';
        field = 'email';
      }
      
      setError(field, {
        type: 'manual',
        message: message,
      });
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
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              width="90%"
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="Senha"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              marginBottom={0}
              width="90%"
              error={errors.password?.message}
            />
          )}
        />

        <TouchableOpacity 
          style={styles.forgotPasswordContainer}
          onPress={() => router.push('/(panel)/ForgotPassword/ForgotPasswordEmail')}
        >
          <Text style={[styles.colorfulText, { marginTop: 4, marginBottom: 32 }]}>
            Esqueceu a senha?
          </Text>
        </TouchableOpacity>


        <TouchableOpacity 
          style={[styles.button, { width: '90%' }]} 
          onPress={handleSubmit(handleLogin)}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

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
  button: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonPrimary,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textLight,
  },
});
