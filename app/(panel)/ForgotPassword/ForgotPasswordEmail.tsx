import colors from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ForgotPasswordInput } from "../../../components";

export default function ForgotPasswordEmail() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Redefinir senha</Text>
        <Text style={styles.subtitle}>
          Digite o e-mail vinculado à sua conta para que possamos enviar um
          código de verificação e permitir a redefinição da sua senha.
        </Text>

        {/* Campo de email */}
        <ForgotPasswordInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Botão no final da página */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push("(panel)/ForgotPassword/ForgotPasswordCode" as any)
          }
        >
          <Text style={styles.buttonText}>Enviar email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 28,
    color: colors.textLight,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textLight,
    opacity: 0.8,
    marginBottom: 40,
    lineHeight: 22,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  button: {
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.buttonPrimary,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textDark,
  },
});
