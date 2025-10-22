import colors from '@/constants/colors';
import { Activity, Brain, Heart, Zap } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontFamily } from '../constants/fonts';

interface BrainPartCardProps {
  name: string;
  onPress: () => void;
  imageColor?: string;
  icon?: string;
}

export default function BrainPartCard({ 
  name, 
  onPress, 
  imageColor = colors.surfaceDark,
  icon = 'brain'
}: BrainPartCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'cerebro':
        return <Brain color={colors.textOnDark} size={40} />;
      case 'cerebelo':
        return <Activity color={colors.textOnDark} size={40} />;
      case 'tronco':
        return <Zap color={colors.textOnDark} size={40} />;
      case 'hipotalamo':
        return <Heart color={colors.textOnDark} size={40} />;
      case 'amigdala':
        return <Brain color={colors.textOnDark} size={40} />;
      default:
        return <Brain color={colors.textOnDark} size={40} />;
    }
  };

  return (
    <TouchableOpacity style={styles.brainPartCard} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.brainPartImageContainer, { backgroundColor: imageColor }]}>
        {getIcon()}
      </View>
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
