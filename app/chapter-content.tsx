import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AssociationCategoria, AssociationItem, associations } from "../constants/associations";
import { ChapterContentType, contents } from "../constants/chapter-content";

// Função utilitária para deixar a primeira letra de cada palavra maiúscula
function toTitleCase(str: string) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (txt) => txt.toUpperCase());
}

export default function ChapterContent() {
  const route = useRoute();
  const router = useRouter();
  const { categoria, tipo, chapterId, title, from } = route.params as {
    categoria: keyof typeof contents;
    tipo: string;
    chapterId: string | number;
    title?: string;
    from?: string;
  };

  const chapterIdNum = Number(chapterId);

  // Cast de tipo para acessar o conteúdo corretamente
  const chapterData: ChapterContentType | undefined =
    contents[categoria]?.[tipo as keyof typeof contents[typeof categoria]]?.[chapterIdNum];

  // Associações para o item atual, padrão vazio se não existir
  const assoc: AssociationItem = associations[tipo] || {
    emocoes: [],
    neurotransmissores: [],
    partesCerebro: [],
  };

  const categorias: AssociationCategoria[] = ['emocoes', 'neurotransmissores', 'partesCerebro'];

  const handleBack = () => {
    router.back(); // volta para a página anterior
  };

  if (!chapterData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            accessibilityLabel="Voltar"
          >
            <FontAwesome6 name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          <Text style={styles.content}>
            Não foi possível carregar o capítulo.
          </Text>
        </View>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessibilityLabel="Voltar"
        >
          <FontAwesome6 name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        {/* Marcadores de conteúdos relacionados */}
        <View style={styles.markers}>
          {categorias.flatMap((categoria) =>
            assoc[categoria].map((chave: string) => (
              <TouchableOpacity
                key={categoria + '-' + chave}
                style={styles.marker}
                  onPress={() =>
                    router.push(`/chapters?tipo=${categoria}&id=${chave}&name=${encodeURIComponent(toTitleCase(chave))}&from=${from || categoria}`)
                  }
              >
                <Text style={styles.textMarker} numberOfLines={2} ellipsizeMode="tail">
                  {toTitleCase(chave)}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Conteúdo padrão */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{chapterData.title}</Text>
            <Text style={styles.content}>{chapterData.content}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface
  },
  header: {
    height: 200,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 8,
  },
  contentWrapper: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    flex: 1,
    backgroundColor: colors.surface,
    marginTop: -40,
    paddingTop: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
    color: colors.textPrimary,
    fontFamily: fontFamily.semibold,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
    marginBottom: 20,
    fontFamily: fontFamily.regular,
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
    backgroundColor: colors.accentPurple,
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
    color: colors.textOnDark,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 13, 
  },
});
