import colors from '@/constants/colors';
import { Activity, Brain, Flame, Heart, Shield, Zap } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontFamily } from '../constants/fonts';

interface NeurotransmitterCardProps {
  name: string;
  onPress: () => void;
  iconColor?: string;
  icon?: string;
}

export default function NeurotransmitterCard({ 
  name, 
  onPress, 
  iconColor = colors.brandLight,
  icon = 'zap'
}: NeurotransmitterCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'dopamina':
        return <Zap color={colors.textOnDark} size={24} />;
      case 'serotonina':
        return <Heart color={colors.textOnDark} size={24} />;
      case 'acetilcolina':
        return <Brain color={colors.textOnDark} size={24} />;
      case 'adrenalina':
        return <Flame color={colors.textOnDark} size={24} />;
      case 'gaba':
        return <Shield color={colors.textOnDark} size={24} />;
      case 'glutamato':
        return <Activity color={colors.textOnDark} size={24} />;
      default:
        return <Zap color={colors.textOnDark} size={24} />;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconSquare, { backgroundColor: iconColor }]}>
        {getIcon()}
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
    backgroundColor: colors.surfaceLight,
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
