import { auth, register as firebaseRegister } from '@/constants/auth';
import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { RegisterFormData, registerSchema } from '@/constants/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthLayout, CustomInput } from '../../components';

export default function Register() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Redireciona automaticamente para Home quando o usuário estiver logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/(tabs)/home' as any);
      }
    });

    return unsubscribe;
  }, []);

  const handleRegister = async (data: RegisterFormData) => {
    try {
      // Cria usuário no Firebase
      await firebaseRegister(data.email, data.password, data.name);

      // Não precisa chamar router.push aqui
    } catch (error: any) {
      let message = 'Erro ao criar conta';
      let field: keyof RegisterFormData = 'email';

      if (error.code === 'auth/email-already-in-use') {
        message = 'Email já está em uso';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email inválido';
      } else if (error.code === 'auth/weak-password') {
        message = 'Senha muito fraca';
        field = 'password';
      }

      setError(field, { type: 'manual', message });
    }
  };

  return (
    <AuthLayout showLogo={false} headerText="" headerHeight={175} showBackButton={true}>
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>
        Desperte sua curiosidade sobre{'\n'}a mente
      </Text>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="Nome"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
              width="90%"
              error={errors.name?.message}
            />
          )}
        />

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
              width="90%"
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="Confirmar senha"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              width="90%"
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <TouchableOpacity
          style={[styles.button, { width: '90%' }]}
          onPress={handleSubmit(handleRegister)}
          disabled={isSubmitting} // previne múltiplos cliques
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>
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
