import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BrainPartCardProps {
  name: string;
  onPress: () => void;
  imageColor?: string;
}

export default function BrainPartCard({ 
  name, 
  onPress, 
  imageColor = '#001C2A' // Cor diferente para diferenciar das emoções
}: BrainPartCardProps) {
  return (
    <TouchableOpacity style={styles.brainPartCard} onPress={onPress}>
      <View style={[styles.brainPartImageContainer, { backgroundColor: imageColor }]} />
      <View style={styles.brainPartInfo}>
        <Text style={styles.brainPartName}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  brainPartCard: {
    width: 160,
    marginRight: 15,
    marginBottom: 16, 
    backgroundColor: '#fff',
  },
  brainPartImageContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brainPartInfo: {
    padding: 12,
  },
  brainPartName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001B29',
  },
});
