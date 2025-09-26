import colors from '@/constants/colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AssociationCategoria, AssociationItem, associations } from '../constants/associations';
import { chapters } from '../constants/chapters';
import { fontFamily } from '../constants/fonts';


// Função utilitária para deixar a primeira letra de cada palavra maiúscula
function toTitleCase(str: string) {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default function Chapters() {
  const { tipo, id, from } = useLocalSearchParams<{ tipo?: string; id?: string; from?: string }>();
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
    // Volta para a tela baseada no parâmetro 'from'
    switch (from) {
      case 'home':
        router.replace('/(tabs)/home');
        break;
      case 'neurotransmitters':
        router.replace('/(tabs)/neurotransmitters');
        break;
      case 'brain':
        router.replace('/(tabs)/brain');
        break;
      case 'emotions':
        router.replace('/(tabs)/emotions');
        break;
      default:
        // Fallback: usa o tipo se 'from' não estiver definido
        switch (tipo) {
          case 'neurotransmissores':
            router.replace('/(tabs)/neurotransmitters');
            break;
          case 'partesCerebro':
            router.replace('/(tabs)/brain');
            break;
          case 'emocoes':
            router.replace('/(tabs)/emotions');
            break;
          default:
            router.replace('/(tabs)/home');
        }
    }
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
                   router.push(`/chapters?tipo=${categoria}&id=${chave}&from=${from}`)
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
          ListEmptyComponent={<Text style={styles.empty}>Não foram encontrados capítulos.</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 200,
    backgroundColor: colors.primary,
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
    fontFamily: fontFamily.semibold,
    fontSize: 28,
  },
  content: {
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
    backgroundColor: colors.purpleLight,
    width: 100,
    height: 28, 
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  textMarker: {
    fontFamily: fontFamily.regular,
    color: colors.textLight,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 13, 
  },
  chapterItem: {
    height: 75,
    justifyContent: 'center',
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chapterTitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
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
