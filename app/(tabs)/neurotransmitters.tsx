import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContentCard, HeaderCard } from '../../components';

// Dados estáticos dos neurotransmissores
const NEUROTRANSMITTERS = [
  { id: 'neurotransmissores', name: 'O que são os neurotransmissores?', info: 'Descubra como essas substâncias químicas transmitem mensagens entre neurônios e controlam funções como humor, memória e atenção.' },
  { id: 'dopamina', name: 'Dopamina: a molécula da motivação', info: 'Entenda como a dopamina influencia prazer, recompensa e foco, e por que ela é essencial para aprender e se sentir motivado.' },
  { id: 'serotonina', name: 'Serotonina: o estabilizador do humor', info: 'Veja como a serotonina ajuda a regular o bem-estar, o sono e a ansiedade, mantendo o equilíbrio emocional.' },
  { id: 'adrenalina', name: 'Adrenalina: o impulso da ação', info: 'Saiba como a adrenalina prepara seu corpo para reagir rapidamente em situações de perigo ou desafio.' },
];

export default function NeurotransmittersScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Carrossel dos Neurotransmissores */}
        <HeaderCard variant="dark" />

        {/* Lista de neurotransmissores */}
        <View style={styles.brainContainer}>
          <Text style={styles.brainTitle}>
            Neurotransmissores
          </Text>

          {NEUROTRANSMITTERS.map((nt) => (
            <ContentCard
              key={nt.id}
              title={nt.name}
              description={nt.info}
              onPress={() => router.push(`/chapters?tipo=neurotransmissores&id=${nt.id}&from=neurotransmitters`)}
              imageContainerColor="#B2A4FF" // Cor azul para neurotransmissores
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
    backgroundColor: '#FBFBFB',
  },
  brainContainer: {
    marginTop: 230,
    padding: 20,
  },
  brainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
    paddingBottom: 20,
  },
});
