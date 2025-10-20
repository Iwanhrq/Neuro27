import { auth } from '@/constants/auth';
import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail
} from 'firebase/auth';
import { useEffect, useState } from 'react';
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
// Importamos 'sendEmailVerification'

export default function EditEmailScreen() {
    const router = useRouter();

    // Estados dos inputs
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Função para voltar
    const goBack = () => router.back();

    // Carrega email atual do usuário
    useEffect(() => {
        const user = auth.currentUser;
        if (user?.email) setCurrentEmail(user.email);
    }, []);

    // Função para atualizar email
    const handleUpdateEmail = async () => {
        // Trim dos campos
        const newEmailTrim = newEmail.trim();
        const confirmEmailTrim = confirmEmail.trim();
        const passwordTrim = password;

        // 1. Validações iniciais
        if (!newEmailTrim || !confirmEmailTrim || !passwordTrim) {
            return Alert.alert('Atenção', 'Preencha todos os campos.');
        }

        if (newEmailTrim !== confirmEmailTrim) {
            return Alert.alert('Erro', 'Os e-mails não coincidem.');
        }
        
        // 2. Verifica se o novo email é diferente do atual (case-insensitive)
        const user = auth.currentUser;
        if (!user || !user.email) {
            return Alert.alert('Erro', 'Usuário não autenticado.');
        }

        if (newEmailTrim.toLowerCase() === user.email.toLowerCase()) {
            return Alert.alert('Atenção', 'O novo e-mail deve ser diferente do e-mail atual.');
        }

        // 2.5 checa se o usuário tem provedor de senha (caso contrário reautenticação com senha falhará)
        const hasPasswordProvider = (user.providerData || []).some(p => p.providerId === 'password');
        if (!hasPasswordProvider) {
            return Alert.alert(
                'Atenção',
                'Sua conta não usa autenticação por senha. Reautentique-se com o provedor usado (ex.: Google) ou vincule uma senha nas configurações de conta.'
            );
        }

        setLoading(true);

        try {
            // 3. Reautenticação com senha atual (medida de segurança)
            const currentEmailForCred = user.email; // usa o email atual do user
            const credential = EmailAuthProvider.credential(currentEmailForCred, passwordTrim);
            await reauthenticateWithCredential(user, credential);

            // 4. Mudar o e-mail no Firebase
            await updateEmail(user, newEmailTrim); 
            
            // 5. Envia o e-mail de verificação para o novo endereço
            await sendEmailVerification(user); 

            // 6. Alerta de Sucesso
            Alert.alert(
                'Sucesso!', 
                'Seu e-mail foi alterado com sucesso. Um link de verificação foi enviado para ' + newEmailTrim + '. Você deve clicar no link para confirmar e poder logar com o novo e-mail.', 
                [{ text: 'OK', onPress: goBack }]
            );
            
        } catch (error: any) {
            console.log('Erro ao atualizar e-mail:', error);
            
            let errorMessage = 'Não foi possível atualizar o e-mail. Tente novamente ou verifique as configurações do Firebase.';

            // Mapeia erros comuns do Firebase para mensagens mais amigáveis
            const code = error?.code || error?.message || '';
            if (code.includes('wrong-password') || code.includes('invalid-credential')) {
                errorMessage = 'A senha informada está incorreta. Tente novamente.';
            } else if (code.includes('invalid-email')) {
                errorMessage = 'O novo e-mail não é válido.';
            } else if (code.includes('email-already-in-use')) {
                errorMessage = 'O novo e-mail já está sendo usado por outra conta.';
            } else if (code.includes('operation-not-allowed')) {
                errorMessage = 'A operação de mudança de e-mail não está habilitada. Verifique as configurações do Firebase.';
            } else if (code.includes('requires-recent-login')) {
                errorMessage = 'É necessário fazer login novamente antes de alterar o e-mail. Faça logout e entre novamente e tente de novo.';
            } else if (code.includes('too-many-requests')) {
                errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
            }

            Alert.alert('Erro', errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    // UI Componente
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
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
                    <Text style={styles.headerTitle}>Alterar e-mail</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* E-mail atual */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.floatingLabel}>E-mail atual</Text>
                        <TextInput
                            style={[styles.textInput, { color: colors.textPrimary }]}
                            value={currentEmail}
                            editable={false}
                        />
                    </View>
                </View>

                {/* Novo e-mail */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.floatingLabel}>Novo e-mail</Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={newEmail}
                            onChangeText={setNewEmail}
                        />
                    </View>
                </View>

                {/* Confirmar novo e-mail */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.floatingLabel}>Confirmar novo e-mail</Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={confirmEmail}
                            onChangeText={setConfirmEmail}
                        />
                    </View>
                </View>

                {/* Senha */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.floatingLabel}>Senha</Text>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                {/* Botão salvar */}
                <TouchableOpacity
                    style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                    onPress={handleUpdateEmail}
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