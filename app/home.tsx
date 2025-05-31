import { StyleSheet, View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Você está logado como admin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
}); 