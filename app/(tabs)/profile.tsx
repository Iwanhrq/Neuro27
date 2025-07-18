import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [cardWidth, setCardWidth] = useState(() => {
    const w = Dimensions.get('window').width * 0.95;
    return w > 350 ? 350 : w;
  });

  useEffect(() => {
    const updateWidth = () => {
      const w = Dimensions.get('window').width * 0.95;
      setCardWidth(w > 350 ? 350 : w);
    };
    const subscription = Dimensions.addEventListener('change', updateWidth);
    return () => subscription?.remove && subscription.remove();
  }, []);

  const triangleBase = cardWidth;
  const triangleHeight = 0.8 * cardWidth; // proporção semelhante ao original

  return (
    <View style={styles.container}>
      <View style={[styles.background, { width: cardWidth, maxWidth: 350 }]}>
        {/* Triângulo decorativo */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          borderTopLeftRadius: 60,
          borderRightWidth: triangleBase,
          borderTopWidth: triangleHeight,
          borderRightColor: 'transparent',
          borderTopColor: '#ABD4FC',
          borderStyle: 'solid',
          zIndex: 0,
        }} />
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Meu perfil</Text>
        </View>
        {/* Foto de perfil */}
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={require('../../assets/images/anonymus.jpg')}
          />
          <Text style={styles.profileName}>Nome do Usuário</Text>
        </View>

        {/* Campos */}
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <Feather name="user" size={20} color="#888" />
            <TextInput
              style={styles.input}
              value={"Nome do Usuário"}
              editable={false}
              placeholder="Nome"
            />
          </View>
          <View style={styles.inputBox}>
            <MaterialIcons name="email" size={20} color="#888" />
            <TextInput
              style={styles.input}
              value={"usuario@email.com"}
              editable={false}
              placeholder="Email"
            />
          </View>
          <View style={styles.inputBox}>
            <Feather name="lock" size={20} color="#888" />
            <TextInput
              style={styles.input}
              value={"************"}
              editable={false}
              placeholder="Senha"
              secureTextEntry
            />
          </View>
        </View>
        {/* Botão Editar (infuncional) */}
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  background: {
    marginTop: 60,
    // width será definido dinamicamente
    height: '85%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  // triangle removido, agora inline
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    zIndex: 1, // Fica acima do triângulo
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#001B29',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    zIndex: 1, // Fica acima do triângulo
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#001B29',
  },
  inputContainer: {
    marginTop: 10,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    marginBottom: 16, // Espaço entre os inputs
  },
  input: {
    marginLeft: 10,
    flex: 1,
    color: '#333',
    fontSize: 17,
  },
  editButton: {
    backgroundColor: '#add8ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 0,
    width: 120,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});