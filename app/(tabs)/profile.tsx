import { auth } from '@/constants/auth';
import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
            <Text style={styles.subtitle}>
              Gerencie suas informações e configurações pessoais
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
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
  subtitle: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 50,
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
