import { auth } from '@/constants/auth';
import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { useChapterProgressContext } from '@/contexts/ChapterProgressContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { ChevronDown, Edit, Settings, Shield, UserRound } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPersonalInfoExpanded, setIsPersonalInfoExpanded] = useState(false);
  const [isPreferencesExpanded, setIsPreferencesExpanded] = useState(false);
  const [isAccountSettingsExpanded, setIsAccountSettingsExpanded] = useState(false);

  // Contexto para gerenciar progresso dos capítulos
  const { progressPercentage, completedChapters, totalChapters } = useChapterProgressContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.uid) {
        // Carrega imagem salva localmente
        try {
          const savedImage = await AsyncStorage.getItem(`profile_image_${currentUser.uid}`);
          if (savedImage) {
            setProfileImage(savedImage);
            console.log('Carregou foto local:', savedImage);
          }
        } catch (error) {
          console.log('Erro ao carregar imagem local:', error);
        }
      }
    });

    return unsubscribe;
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
      return false;
    }
    return true;
  };

  const selectImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    Alert.alert(
      'Selecionar Foto',
      'Escolha uma opção',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Galeria', onPress: () => pickImageFromGallery() },
        { text: 'Câmera', onPress: () => pickImageFromCamera() },
      ]
    );
  };


  const saveImageLocally = async (imageUri: string) => {
    try {
      if (user?.uid) {
        await AsyncStorage.setItem(`profile_image_${user.uid}`, imageUri);
        console.log('Imagem salva localmente');
      }
    } catch (error) {
      console.log('Erro ao salvar imagem localmente:', error);
    }
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);

      // Salva localmente
      await saveImageLocally(imageUri);
      Alert.alert('Sucesso', 'Foto de perfil salva com sucesso!');
    }
  };

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);

      // Salva localmente
      await saveImageLocally(imageUri);
      Alert.alert('Sucesso', 'Foto de perfil salva com sucesso!');
    }
  };


  const togglePersonalInfoMenu = () => {
    setIsPersonalInfoExpanded(!isPersonalInfoExpanded);
  };

  const togglePreferencesMenu = () => {
    setIsPreferencesExpanded(!isPreferencesExpanded);
  };

  const toggleAccountSettingsMenu = () => {
    setIsAccountSettingsExpanded(!isAccountSettingsExpanded);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(panel)/login'); // redireciona para login
    } catch (error) {
      console.log('Erro ao deslogar:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header azul com fundo */}
        <View style={styles.header} />

        {/* Moldura circular sobreposta */}
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.circle} onPress={selectImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={styles.circleText}>👤</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Bloco branco com borda arredondada */}
        <View style={styles.contentBlock}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {user?.displayName || 'Usuário'}
            </Text>

            {/* Barra de Progresso Geral */}
            <View style={styles.progressSection}>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
                </View>
              </View>
              <View style={styles.progressPercentageContainer}>
                <Text style={styles.progressPercentage}>{progressPercentage}% completo</Text>

              </View>
              <Text style={styles.progressMessage}>
                {progressPercentage === 100
                  ? "Parabéns! Você completou todos os capítulos!"
                  : progressPercentage >= 75
                    ? "Você está quase lá! Continue assim!"
                    : progressPercentage >= 50
                      ? "Metade do caminho percorrido! Não pare agora!"
                      : "Você já começou sua jornada! Continue explorando!"
                }
              </Text>
            </View>

            {/*Seção de Informações Pessoais*/}
            <View style={[styles.sectionContainer, isPersonalInfoExpanded && styles.sectionContainerExpanded]}>
              <TouchableOpacity style={styles.sectionHeader} onPress={togglePersonalInfoMenu}>
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTextContainer}>
                    <UserRound color={colors.accentPurple} size={30} style={styles.sectionIcon} />
                    <View style={styles.sectionTextsContainer}>
                      <Text style={styles.sectionTitle}>Informações pessoais</Text>
                      <Text style={styles.sectionSubtitle}>Nome, e-mail, senha e foto de perfil</Text>
                    </View>
                  </View>
                  <ChevronDown 
                    color={colors.accentPurple} 
                    size={20} 
                    style={[styles.expandIcon, isPersonalInfoExpanded && styles.expandIconRotated]} 
                  />
                </View>
              </TouchableOpacity>
              {/*Menu - só aparece se expandido*/}
              {isPersonalInfoExpanded && (
                <>
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemContent}>
                      <Edit color={colors.accentPurple} size={18} style={styles.menuItemIcon} />
                      <Text style={styles.menuItemText}>Editar perfil</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemContent}>
                      <Edit color={colors.accentPurple} size={18} style={styles.menuItemIcon} />
                      <Text style={styles.menuItemText}>Editar endereço de e-mail</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemContent}>
                      <Edit color={colors.accentPurple} size={18} style={styles.menuItemIcon} />
                      <Text style={styles.menuItemText}>Editar senha</Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/*Linha Divisória*/}
            <View style={styles.divider} />

            {/*Seção de Preferências*/}
            <View style={[styles.sectionContainer, isPreferencesExpanded && styles.sectionContainerExpanded]}>
              <TouchableOpacity style={styles.sectionHeader} onPress={togglePreferencesMenu}>
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTextContainer}>
                    <Settings color={colors.accentPurple} size={30} style={styles.sectionIcon} />
                    <View style={styles.sectionTextsContainer}>
                      <Text style={styles.sectionTitle}>Preferências</Text>
                      <Text style={styles.sectionSubtitle}>Tema, preferências de notificações</Text>
                    </View>
                  </View>
                  <ChevronDown 
                    color={colors.accentPurple} 
                    size={20} 
                    style={[styles.expandIcon, isPreferencesExpanded && styles.expandIconRotated]} 
                  />
                </View>
              </TouchableOpacity>
              {/*Menu - só aparece se expandido*/}
              {isPreferencesExpanded && (
                <>
                  <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Tema</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Notificações</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Idioma</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/*Linha Divisória*/}
            <View style={styles.divider} />

            {/*Seção de Configurações de Conta*/}
            <View style={[styles.sectionContainer, isAccountSettingsExpanded && styles.sectionContainerExpanded]}>
              <TouchableOpacity style={styles.sectionHeader} onPress={toggleAccountSettingsMenu}>
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTextContainer}>
                    <Shield color={colors.accentPurple} size={30} style={styles.sectionIcon} />
                    <View style={styles.sectionTextsContainer}>
                      <Text style={styles.sectionTitle}>Configurações de conta</Text>
                      <Text style={styles.sectionSubtitle}>Sair ou excluir perfil</Text>
                    </View>
                  </View>
                  <ChevronDown 
                    color={colors.accentPurple} 
                    size={20} 
                    style={[styles.expandIcon, isAccountSettingsExpanded && styles.expandIconRotated]} 
                  />
                </View>
              </TouchableOpacity>
              {/*Menu - só aparece se expandido*/}
              {isAccountSettingsExpanded && (
                <>
                  <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <View style={styles.menuItemContent}>
                      <Edit color={colors.accentPurple} size={18} style={styles.menuItemIcon} />
                      <Text style={styles.menuItemText}>Sair da conta</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemContent}>
                      <Edit color={colors.accentPurple} size={18} style={styles.menuItemIcon} />
                      <Text style={[styles.menuItemText, styles.dangerText]}>Excluir perfil</Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Espaço branco ao final */}
            <View style={styles.bottomSpacing} />

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 180,
    width: '100%',
    backgroundColor: colors.surfaceDark,
  },
  circleContainer: {
    position: 'absolute',
    top: 130, // metade do círculo sobre o header
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.surfaceDark,
    borderWidth: 4,
    borderColor: colors.textOnDark,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 142,
    height: 142,
    borderRadius: 71,
  },
  circleText: {
    fontSize: 60,
    color: colors.textOnDark,
  },
  contentBlock: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 50, // empurra o conteúdo pra baixo do círculo
    paddingTop: 60,
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  progressSection: {
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  progressPercentageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  progressPercentage: {
    fontSize: 20,
    fontFamily: fontFamily.semibold,
    color: colors.surfaceDark,
  },
  progressDetails: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    marginTop: 4,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 20,
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.surfaceDark,
    borderRadius: 8,
  },
  progressMessage: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.surfaceDark,
    textAlign: 'center',
  },
  sectionContainer: {
    borderRadius: 10,
    marginVertical: 0,
    overflow: 'hidden',
  },
  sectionContainerExpanded: {
    backgroundColor: colors.surfaceLight,
  },
  sectionHeader: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 12,
  },
  sectionTextsContainer: {
    flex: 1,
  },
  expandIcon: {
    marginLeft: 10,
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.semibold,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    marginTop: 2,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
  },
  dangerText: {
    color: colors.danger,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outline,
    marginVertical: 1,
    marginHorizontal: 5,
  },
  bottomSpacing: {
    height: 50,
    backgroundColor: colors.surface,
  },
  button: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.button,
    marginTop: 20,
  },
  buttonText: {
    color: colors.textOnDark,
    fontSize: 16,
    fontFamily: fontFamily.semibold,
  },
});
