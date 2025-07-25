import {StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return(
    <View style={styles.container}>
      <Text>
        Perfil do usuário
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});