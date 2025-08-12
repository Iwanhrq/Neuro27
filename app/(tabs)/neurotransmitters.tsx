import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContentCard, HeaderCard } from '../../components';

// Dados estáticos dos neurotransmissores
const NEUROTRANSMITTERS = [
  { id: '1', name: 'Dopamina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '2', name: 'Serotonina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '3', name: 'Acetilcolina', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '4', name: 'GABA', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
  { id: '5', name: 'Glutamato', info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis hic possimus amet, provident quisquam velit magnam fugit in ea sapiente.' },
];

export default function NeurotransmittersScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Carrossel dos Neurotransmissores */}
        <HeaderCard title="Neurotransmissores" />

        {/* Lista de neurotransmissores */}
        <View style={styles.brainContainer}>
          <Text style={styles.brainTitle}>
            Principais neurotransmissores
          </Text>

          {NEUROTRANSMITTERS.map((nt) => (
            <ContentCard
              key={nt.id}
              title={nt.name}
              description={nt.info}
              onPress={() => router.push(`/chapters?tipo=neurotransmissores&id=${nt.name.toLowerCase()}`)}
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
    padding: 20,
    backgroundColor: '#fff',
  },
  brainContainer: {
    marginTop: 30,
  },
  brainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001B29',
  },
});
