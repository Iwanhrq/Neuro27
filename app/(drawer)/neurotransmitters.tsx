import colors from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ContentCard } from '../../components';

// Dados estáticos dos neurotransmissores
const NEUROTRANSMITTERS = [
  { id: 'neurotransmissores', name: 'Neurotransmissores', title: 'O que são os neurotransmissores?', info: 'Descubra como essas substâncias químicas transmitem mensagens entre neurônios e controlam funções como humor, memória e atenção.' },
  { id: 'dopamina', name: 'Dopamina', title: 'Dopamina: a molécula da motivação', info: 'Entenda como a dopamina influencia prazer, recompensa e foco, e por que ela é essencial para aprender e se sentir motivado.' },
  { id: 'serotonina', name: 'Serotonina', title: 'Serotonina: o estabilizador do humor', info: 'Veja como a serotonina ajuda a regular o bem-estar, o sono e a ansiedade, mantendo o equilíbrio emocional.' },
  { id: 'acetilcolina', name: 'Acetilcolina', title: 'Acetilcolina: memória e aprendizado', info: 'Entenda o papel da acetilcolina na atenção, memória e processos de aprendizado.' },
  { id: 'gaba', name: 'GABA', title: 'GABA: equilíbrio e calma', info: 'Saiba como o GABA ajuda a inibir a atividade neural, promovendo relaxamento e controle da ansiedade.' },
  { id: 'glutamato', name: 'Glutamato', title: 'Glutamato: excitação e plasticidade', info: 'Veja como o glutamato participa da comunicação neural e da plasticidade sináptica.' },
  { id: 'adrenalina', name: 'Adrenalina', title: 'Adrenalina: o impulso da ação', info: 'Saiba como a adrenalina prepara seu corpo para reagir rapidamente em situações de perigo ou desafio.' },
];


export default function NeurotransmittersScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const openDrawer = () => {
    (navigation as any).openDrawer();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Botão de Menu */}
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <FontAwesome name="bars" size={25} color={colors.surfaceLight} />
        </TouchableOpacity>

        {/* Carrossel dos Neurotransmissores */}
        <View style={styles.headerCard}>
          <View style={[styles.brainCard, { width: Dimensions.get('window').width, height: 220 }]}>
          </View>
        </View>

        {/* Lista de neurotransmissores */}
        <View style={styles.brainContainer}>
          <Text style={styles.brainTitle}>
            Neurotransmissores
          </Text>

          {NEUROTRANSMITTERS.map((nt) => (
            <ContentCard
              key={nt.id}
              title={nt.title} // título curto
              description={nt.info} // descrição longa
              icon={nt.id}
              onPress={() => router.push(
                `/chapters?tipo=neurotransmissores&id=${nt.id}&name=${encodeURIComponent(nt.name)}&from=neurotransmissores`
              )}
              imageContainerColor={colors.accentPurple}
            />
          ))}


        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    position: 'relative',
  },
  brainCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 0,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brainContainer: {
    marginTop: 10,
    padding: 20,
  },
  brainTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    paddingBottom: 20,
  },
});
