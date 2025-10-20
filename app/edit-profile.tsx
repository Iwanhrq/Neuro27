import { auth } from '@/constants/auth';
import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { ChevronDown } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface UserProfile {
  name: string;
  username: string;
  gender: string;
  birthDate: string;
  state: string;
  city: string;
}

export default function EditProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    username: '',
    gender: '',
    birthDate: '',
    state: '',
    city: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para pickers
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showStatePicker, setShowStatePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const genderOptions = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];
  const states = [
    'Acre','Alagoas','Amapá','Amazonas','Bahia','Ceará','Distrito Federal','Espírito Santo','Goiás',
    'Maranhão','Mato Grosso','Mato Grosso do Sul','Minas Gerais','Pará','Paraíba','Paraná','Pernambuco',
    'Piauí','Rio de Janeiro','Rio Grande do Norte','Rio Grande do Sul','Rondônia','Roraima','Santa Catarina',
    'São Paulo','Sergipe','Tocantins'
  ];

  // Carrega usuário atual do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadProfileData(currentUser.uid);
      }
    });
    return unsubscribe;
  }, []);

  // Carrega dados do perfil salvos localmente
  const loadProfileData = async (uid: string) => {
    try {
      const savedProfile = await AsyncStorage.getItem(`profile_${uid}`);
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      else setProfile(prev => ({ ...prev, name: user?.displayName || '' }));

      const savedImage = await AsyncStorage.getItem(`profile_image_${uid}`);
      if (savedImage) setProfileImage(savedImage);
    } catch (error) {
      console.log('Erro ao carregar dados do perfil:', error);
    }
  };

  // Salva dados do perfil localmente
  const saveProfileData = async (profileData: UserProfile) => {
    if (!user?.uid) return;
    try {
      await AsyncStorage.setItem(`profile_${user.uid}`, JSON.stringify(profileData));
      console.log('Dados do perfil salvos localmente');
    } catch (error) {
      console.log('Erro ao salvar dados do perfil:', error);
    }
  };

  // Solicita permissões da galeria
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
      return false;
    }
    return true;
  };

  // Seleciona imagem (Galeria ou Câmera)
  const selectImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    Alert.alert(
      'Selecionar Foto',
      'Escolha uma opção',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Galeria', onPress: pickImageFromGallery },
        { text: 'Câmera', onPress: pickImageFromCamera },
      ]
    );
  };

  // Salva imagem localmente
  const saveImageLocally = async (imageUri: string) => {
    if (!user?.uid) return;
    try {
      await AsyncStorage.setItem(`profile_image_${user.uid}`, imageUri);
      console.log('Imagem salva localmente');
    } catch (error) {
      console.log('Erro ao salvar imagem localmente:', error);
    }
  };

  // Galeria
  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await saveImageLocally(uri);
      Alert.alert('Sucesso', 'Foto de perfil atualizada!');
    }
  };

  // Câmera
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
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await saveImageLocally(uri);
      Alert.alert('Sucesso', 'Foto de perfil atualizada!');
    }
  };

  // Salva perfil
  const handleSave = async () => {
    if (!profile.name.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório');
      return;
    }

    setIsLoading(true);

    try {
      if (user) await updateProfile(user, { displayName: profile.name });
      await saveProfileData(profile);
      Alert.alert('Sucesso', 'Perfil atualizado!', [{ text: 'OK', onPress: () => router.back() }]);
    } catch (error) {
      console.log('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >

        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Fundo azul com foto */}
        <View style={styles.blueBackgroundContainer}>
          <View style={styles.blueBackground}>
            <TouchableOpacity style={styles.profileImageCircle} onPress={selectImage}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <Text style={styles.profileImagePlaceholder}>👤</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.changePhotoButton} onPress={selectImage}>
              <Text style={styles.changePhotoText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nome */}
        <View style={styles.inputContainer}>
          <Text style={styles.floatingLabel}>Nome completo *</Text>
          <TextInput
            style={styles.textInput}
            value={profile.name}
            onChangeText={text => setProfile(prev => ({ ...prev, name: text }))}
          />
        </View>

        {/* Nome de usuário */}
        <View style={styles.inputContainer}>
          <Text style={styles.floatingLabel}>Nome de usuário</Text>
          <TextInput
            style={styles.textInput}
            value={profile.username}
            onChangeText={text => setProfile(prev => ({ ...prev, username: text }))}
          />
        </View>

        {/* Gênero */}
        <View style={styles.inputContainer}>
          <View style={[styles.pickerWrapper, showGenderPicker && styles.pickerWrapperExpanded]}>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowGenderPicker(!showGenderPicker)}
            >
              <Text style={[styles.pickerText, !profile.gender && styles.placeholderText]}>
                {profile.gender || 'Selecione seu gênero'}
              </Text>
              <ChevronDown color={colors.textSecondary} size={20} style={[showGenderPicker && { transform: [{ rotate: '180deg' }] }]} />
            </TouchableOpacity>
          </View>

          {showGenderPicker && (
            <View style={styles.pickerOptions}>
              {genderOptions.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.pickerOption,
                    index === genderOptions.length - 1 && { borderBottomWidth: 0 },
                  ]}
                  onPress={() => {
                    setProfile(prev => ({ ...prev, gender: option }));
                    setShowGenderPicker(false);
                  }}
                >
                  <Text style={styles.pickerOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Data de nascimento */}
        <View style={styles.inputContainer}>
          <View style={[styles.pickerWrapper, showDatePicker && styles.pickerWrapperExpanded]}>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowDatePicker(!showDatePicker)}
            >
              <Text style={[styles.pickerText, !profile.birthDate && styles.placeholderText]}>
                {profile.birthDate ? formatDate(profile.birthDate) : 'Selecione a data'}
              </Text>
              <ChevronDown color={colors.textSecondary} size={20} style={[showDatePicker && { transform: [{ rotate: '180deg' }] }]} />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <View style={styles.datePickerContainer}>
              <TextInput
                style={styles.dateInput}
                value={profile.birthDate}
                onChangeText={text => setProfile(prev => ({ ...prev, birthDate: text }))}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                maxLength={10}
              />
              <TouchableOpacity style={styles.datePickerClose} onPress={() => setShowDatePicker(false)}>
                <Text style={styles.datePickerCloseText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Estado */}
        <View style={styles.inputContainer}>
          <View style={[styles.pickerWrapper, showStatePicker && styles.pickerWrapperExpanded]}>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowStatePicker(!showStatePicker)}
            >
              <Text style={[styles.pickerText, !profile.state && styles.placeholderText]}>
                {profile.state || 'Selecione o estado'}
              </Text>
              <ChevronDown color={colors.textSecondary} size={20} style={[showStatePicker && { transform: [{ rotate: '180deg' }] }]} />
            </TouchableOpacity>
          </View>

          {showStatePicker && (
            <View style={styles.statePickerContainer}>
              <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
                {states.map((state, index) => (
                  <TouchableOpacity
                    key={state}
                    style={[
                      styles.pickerOption,
                      index === states.length - 1 && { borderBottomWidth: 0 },
                    ]}
                    onPress={() => {
                      setProfile(prev => ({ ...prev, state }));
                      setShowStatePicker(false);
                    }}
                  >
                    <Text style={styles.pickerOptionText}>{state}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Cidade */}
        <View style={styles.inputContainer}>
          <Text style={styles.floatingLabel}>Cidade</Text>
          <TextInput
            style={styles.textInput}
            value={profile.city}
            onChangeText={text => setProfile(prev => ({ ...prev, city: text }))}
          />
        </View>

        {/* Botão salvar */}
        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>{isLoading ? 'Salvando...' : 'Salvar Alterações'}</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface, paddingHorizontal: 20 },

  // Cabeçalho
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingBottom: 25 },
  headerTitle: { fontSize: 18, fontFamily: fontFamily.semibold, color: colors.textPrimary },

  // Fundo azul com foto
  blueBackgroundContainer: { paddingBottom: 20 },
  blueBackground: { height: 200, backgroundColor: colors.surfaceDark, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  profileImageCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: colors.surfaceDark, borderWidth: 4, borderColor: colors.textOnDark, justifyContent: 'center', alignItems: 'center' },
  profileImage: { width: 112, height: 112, borderRadius: 56 },
  profileImagePlaceholder: { fontSize: 50, color: colors.textOnDark },
  changePhotoButton: { marginTop: 12, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  changePhotoText: { fontSize: 16, fontFamily: fontFamily.semibold, color: colors.textOnDark },

  // Inputs
  inputContainer: { marginBottom: 24 },
  floatingLabel: { fontSize: 12, fontFamily: fontFamily.regular, color: colors.textSecondary, marginBottom: 4 },
  textInput: { fontSize: 16, fontFamily: fontFamily.regular, color: colors.textPrimary, borderWidth: 1, borderColor: colors.outline, borderRadius: 12, padding: 12 },

  // Pickers
  pickerWrapper: { borderWidth: 1, borderColor: colors.outline, borderRadius: 12, padding: 12 },
  pickerWrapperExpanded: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottomWidth: 0 },
  pickerButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pickerText: { fontSize: 16, fontFamily: fontFamily.regular, color: colors.textPrimary },
  placeholderText: { color: colors.textSecondary },
  pickerOptions: { backgroundColor: colors.surfaceLight, borderWidth: 1, borderColor: colors.outline, borderTopWidth: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  pickerOption: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.outline },
  pickerOptionText: { fontSize: 16, fontFamily: fontFamily.regular, color: colors.textPrimary },
  datePickerContainer: { backgroundColor: colors.surfaceLight, borderRadius: 12, borderWidth: 1, borderColor: colors.outline, borderTopWidth: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, padding: 16 },
  dateInput: { fontSize: 16, fontFamily: fontFamily.regular, color: colors.textPrimary, borderBottomWidth: 1, borderBottomColor: colors.outline, paddingVertical: 8, marginBottom: 12 },
  datePickerClose: { alignSelf: 'flex-end', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.accentPurple, borderRadius: 8 },
  datePickerCloseText: { fontSize: 14, fontFamily: fontFamily.semibold, color: colors.textOnDark },
  statePickerContainer: { backgroundColor: colors.surfaceLight, borderRadius: 12, borderWidth: 1, borderColor: colors.outline, borderTopWidth: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, maxHeight: 200 },

  // Botão salvar
  saveButton: { backgroundColor: colors.brand, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  saveButtonDisabled: { backgroundColor: colors.textSecondary },
  saveButtonText: { fontSize: 16, fontFamily: fontFamily.semibold, color: colors.textOnDark },
});
