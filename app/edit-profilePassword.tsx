import { auth } from '@/constants/auth';
import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import { Eye, EyeOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export default function EditPasswordScreen() {
  const router = useRouter();

  // Estados dos inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados para mostrar/ocultar senhas
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Função para voltar
  const goBack = () => router.back();

  // Função para atualizar senha
  const handleUpdatePassword = async () => {
    // Valida campos
    if (!currentPassword || !newPassword || !confirmPassword) {
      return Alert.alert('Atenção', 'Preencha todos os campos.');
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert('Erro', 'As senhas não coincidem.');
    }

    const user = auth.currentUser;
    if (!user || !user.email) return;

    setLoading(true);

    try {
      // Reautenticação com senha atual
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Atualiza senha no Firebase
      await updatePassword(user, newPassword);

      Alert.alert('Sucesso', 'Sua senha foi atualizada com sucesso!', [
        { text: 'OK', onPress: goBack },
      ]);
    } catch (error: any) {
      console.log('Erro ao atualizar senha:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a senha. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {/* ScrollView principal engloba tudo, incluindo o cabeçalho */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <FontAwesome6 name="arrow-left" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Senha</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Senha atual */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.floatingLabel}>Senha atual</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                secureTextEntry={!showCurrent}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
                {showCurrent ? (
                  <EyeOff color={colors.textSecondary} size={20} />
                ) : (
                  <Eye color={colors.textSecondary} size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Nova senha */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.floatingLabel}>Nova senha</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                secureTextEntry={!showNew}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                {showNew ? (
                  <EyeOff color={colors.textSecondary} size={20} />
                ) : (
                  <Eye color={colors.textSecondary} size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Confirmar nova senha */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.floatingLabel}>Confirmar nova senha</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? (
                  <EyeOff color={colors.textSecondary} size={20} />
                ) : (
                  <Eye color={colors.textSecondary} size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Botão salvar */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleUpdatePassword}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 25
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary,
  },
  placeholder: {
    width: 30,
  },
   inputContainer: {
     marginBottom: 24,
   },
   inputWrapper: {
     position: 'relative',
     backgroundColor: 'transparent',
     borderRadius: 12,
     borderWidth: 1,
     borderColor: colors.outline,
     paddingTop: 18,
     paddingBottom: 12,
     paddingHorizontal: 12,
   },
   floatingLabel: {
     position: 'absolute',
     top: 8,
     left: 10,
     fontSize: 12,
     fontFamily: fontFamily.regular,
     color: colors.textSecondary,
     backgroundColor: colors.surface,
     paddingHorizontal: 4,
   },
   textInput: {
     fontSize: 16,
     fontFamily: fontFamily.regular,
     color: colors.textPrimary,
     backgroundColor: 'transparent',
     borderWidth: 0,
     paddingVertical: 2,
     paddingHorizontal: 0,
   },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: fontFamily.semibold,
    color: colors.textOnDark,
  },
  bottomSpacing: {
    height: 50,
  },
});
