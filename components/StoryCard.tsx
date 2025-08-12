import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StoryCardProps {
  name: string;
  onPress: () => void;
  circleColor?: string;
}

export default function StoryCard({ 
  name, 
  onPress, 
  circleColor = '#fff' 
}: StoryCardProps) {
  return (
    <TouchableOpacity style={styles.storyCard} onPress={onPress}>
      <View style={[styles.storyCircle, { backgroundColor: circleColor }]} />
      <Text style={styles.storyName} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  storyCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 90,
  },
  storyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D0E5FB',
    overflow: 'hidden',
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
    color: '#001B29',
    textAlign: 'center',
  },
});
