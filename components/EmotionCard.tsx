import colors from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontFamily } from '../constants/fonts';

interface EmotionCardProps {
  name: string;
  category: string;
  onPress: () => void;
  imageColor?: string;
}

export default function EmotionCard({ 
  name, 
  category, 
  onPress, 
  imageColor = colors.accentPurpleDark
}: EmotionCardProps) {
  return (
    <TouchableOpacity style={styles.emotionCard} onPress={onPress}>
      <View style={[styles.emotionImageContainer, { backgroundColor: imageColor }]} />
      <View style={styles.emotionInfo}>
        <Text style={styles.emotionCategory}>{category}</Text>
        <Text style={styles.emotionName}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  emotionCard: {
    width: 160,
    marginRight: 15,
    marginBottom: 16, 
    backgroundColor: colors.card,
  },
  emotionImageContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionInfo: {
    padding: 12,
  },
  emotionCategory: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  emotionName: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
  },
});
