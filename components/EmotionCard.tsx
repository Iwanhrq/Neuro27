import colors from '@/constants/colors';
import { AlertTriangle, Angry, Frown, Heart, Smile } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontFamily } from '../constants/fonts';

interface EmotionCardProps {
  name: string;
  category: string;
  onPress: () => void;
  imageColor?: string;
  icon?: string;
}

export default function EmotionCard({ 
  name, 
  category, 
  onPress, 
  imageColor = colors.accent,
  icon = 'smile'
}: EmotionCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'alegria':
        return <Smile color={colors.textOnDark} size={40} />;
      case 'tristeza':
        return <Frown color={colors.textOnDark} size={40} />;
      case 'raiva':
        return <Angry color={colors.textOnDark} size={40} />;
      case 'medo':
        return <AlertTriangle color={colors.textOnDark} size={40} />;
      case 'amor':
        return <Heart color={colors.textOnDark} size={40} />;
      default:
        return <Smile color={colors.textOnDark} size={40} />;
    }
  };

  return (
    <TouchableOpacity style={styles.emotionCard} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.emotionImageContainer, { backgroundColor: imageColor }]}>
        {getIcon()}
      </View>
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
