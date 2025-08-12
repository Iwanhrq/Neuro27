import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface LogoutButtonProps {
  onPress: () => void;
}

export default function LogoutButton({ onPress }: LogoutButtonProps) {
  return (
    <View style={styles.logoutButtonContainer}>
      <TouchableOpacity style={styles.logoutButton} onPress={onPress} accessibilityLabel="Sair">
        <MaterialIcons name="logout" size={28} color="#001B29" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  logoutButton: {
    paddingTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
});
