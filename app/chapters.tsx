import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AssociationCategoria, AssociationItem, associations } from '../constants/associations';
import { chapters } from '../constants/chapters';

// Função utilitária para deixar a primeira letra de cada palavra maiúscula
function toTitleCase(str: string) {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default function Chapters() {
  const { tipo, id } = useLocalSearchParams<{ tipo?: string; id?: string }>();
  const router = useRouter();

  if (!tipo || !id) return <Text style={styles.loading}>Loading...</Text>;

  // Lista de capítulos para o tipo e id atuais
  const lista = (chapters as any)[tipo]?.[id] || [];

  // Associações para o item atual, padrão vazio se não existir
  const assoc: AssociationItem = associations[id as string] || {
    emocoes: [],
    neurotransmissores: [],
    partesCerebro: [],
  };

  const categorias: AssociationCategoria[] = ['emocoes', 'neurotransmissores', 'partesCerebro'];

  const handleBack = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Botão de voltar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessibilityLabel="Voltar"
        >
          <FontAwesome6 name="arrow-left" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {id.replace(/_/g, ' ').replace(/^./, (str) => str.toUpperCase())}
        </Text>
      </View>

      <View style={styles.content}>
        {/* Renderiza todos os marcadores juntos, sem título */}
        <View style={styles.markers}>
          {categorias.flatMap((categoria) =>
            assoc[categoria].map((chave: string) => (
              <TouchableOpacity
                key={categoria + '-' + chave}
                style={styles.marker}
                onPress={() =>
                  router.push(`/chapters?tipo=${categoria}&id=${chave}`)
                }
              >
                <Text style={styles.textMarker} numberOfLines={2} ellipsizeMode="tail">{toTitleCase(chave)}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Lista de capítulos */}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 65,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 4,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    flex: 1,
  },
  markers: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  marker: {
    paddingHorizontal: 15,
    paddingVertical: 0,    
    backgroundColor: '#ABD4FC',
    width: 100,
    height: 35, 
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  textMarker: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16, 
  },
  chapterItem: {
    paddingLeft: 25,
    paddingBottom: 25,
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
  markersGroup: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
