import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthLayout, CustomInput } from '../../components';
import { register as firebaseRegister } from '../../constants/auth';
import colors from '../../constants/colors';
import { fontFamily } from '../../constants/fonts';
import { RegisterFormData, registerSchema } from '../../constants/validation';

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

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await firebaseRegister(data.email, data.password, data.name);
      // Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.push('/(panel)/login' as any);
    } catch (error: any) {
      let message = 'Erro ao criar conta';
      let field: keyof RegisterFormData = 'email';
      
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email já está em uso';
        field = 'email';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email inválido';
        field = 'email';
      } else if (error.code === 'auth/weak-password') {
        message = 'Senha muito fraca';
        field = 'password';
      }
      
      setError(field, {
        type: 'manual',
        message: message,
      });
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
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>

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
    color: colors.purple
  },
  button: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ABD4FC',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});
