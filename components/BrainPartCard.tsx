import colors from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontFamily } from '../constants/fonts';

interface BrainPartCardProps {
  name: string;
  onPress: () => void;
  imageColor?: string;
}

export default function BrainPartCard({ 
  name, 
  onPress, 
  imageColor = colors.surfaceDark // Cor diferente para diferenciar das emoções
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
    backgroundColor: colors.card,
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
    fontFamily: fontFamily.semibold,
    fontSize: 16,
  },
});
