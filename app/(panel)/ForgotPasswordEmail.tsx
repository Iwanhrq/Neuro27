import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import colors from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import ForgotPasswordInput from "../../components/ForgotPasswordInput";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/constants/firebase";

// Schema Zod
const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Digite seu e-mail").email("E-mail inválido"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordEmail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);

      Alert.alert(
        "E-mail enviado!",
        "Se este e-mail estiver cadastrado, você receberá um link de redefinição de senha. Verifique sua caixa de entrada ou spam.",
        [
          {
            text: "Voltar ao login",
            onPress: () => router.push("/(panel)/login"),
          },
        ]
      );
    } catch (error: any) {
      console.log("Erro ao enviar email:", error);

      // Mensagem neutra para falha no envio
      setError("email", {
        type: "manual",
        message: "Não foi possível enviar o e-mail. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Redefinir senha</Text>
        <Text style={styles.subtitle}>
          Digite o e-mail vinculado à sua conta para que possamos enviar um link de redefinição.
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <ForgotPasswordInput
              placeholder="Digite seu email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              rightIcon={<Mail color={colors.textSecondary} size={22} />}
              error={errors.email?.message}
            />
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.textPrimary} /> : <Text style={styles.buttonText}>Enviar email</Text>}
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surfaceDark },
  content: { flex: 1, paddingHorizontal: 20 },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 28,
    color: colors.textOnDark,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textOnDark,
    opacity: 0.8,
    marginBottom: 40,
    lineHeight: 22,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  buttonContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  button: {
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.button,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary,
  },
});
