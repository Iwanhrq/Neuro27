import { auth } from '@/constants/auth';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(panel)/login'); // redireciona para login
    } catch (error) {
      console.log('Erro ao deslogar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do usuário</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
  },
  button: {
    height: 45,
    width: 150,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 16,
  },
});
