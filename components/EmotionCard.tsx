import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  imageColor = '#A283C8' 
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
    backgroundColor: '#fff',
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
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  emotionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001B29',
  },
});
