import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { chapters } from '../constants/chapters';

const typeLabels: Record<string, string> = {
  neurotransmissores: 'Neurotransmitter',
  emocoes: 'Emotion',
  partesCerebro: 'Brain Part',
};

export default function Chapters() {
  const { tipo, id } = useLocalSearchParams<{ tipo?: string; id?: string }>();

  if (!tipo || !id) return <Text style={styles.loading}>Loading...</Text>;

  // Busca a lista de capítulos
  const lista = (chapters as any)[tipo]?.[id] || [];
  const typeLabel = typeLabels[tipo] || 'Item';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {id.replace(/_/g, ' ').replace(/^./, str => str.toUpperCase())}
        </Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={lista}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.chapterItem}>
              <Text style={styles.chapterTitle}>{item.title}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No chapters found.</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ABD4FC',
  },
  header: {
    height: 200,
    backgroundColor: '#ABD4FC',
    alignItems: 'center', // centraliza horizontalmente
    justifyContent: 'center', // centraliza verticalmente
    paddingTop: 65,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    backgroundColor: "#fff",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    flex: 1,
    paddingTop: 50,
  },
  chapterItem: {
    paddingLeft: 25,
    paddingBottom: 25
  },
  chapterTitle: {
    fontSize: 19,
    color: '#333',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
  },
  loading: {
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
    fontSize: 18,
  },
}); 