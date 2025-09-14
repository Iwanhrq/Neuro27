import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontFamily } from '../constants/fonts';

interface NeurotransmitterCardProps {
  name: string;
  onPress: () => void;
  iconColor?: string;
}

export default function NeurotransmitterCard({ 
  name, 
  onPress, 
  iconColor = '#D0E5FB'
}: NeurotransmitterCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.iconSquare, { backgroundColor: iconColor }]}>
        {/* Aqui você pode adicionar o ícone depois */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  iconSquare: {
    width: 48,
    borderRadius: 0,
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 18,
  },
});
