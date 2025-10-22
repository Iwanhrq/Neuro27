import { Activity, AlertTriangle, Angry, Brain, Flame, Frown, Heart, Shield, Smile, Zap } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import { fontFamily } from '../constants/fonts';

interface ContentCardProps {
  title: string;
  description: string;
  onPress: () => void;
  imageContainer?: React.ReactNode;
  imageContainerColor?: string;
  icon?: string;
}

export default function ContentCard({ 
  title, 
  description, 
  onPress, 
  imageContainer,
  imageContainerColor = colors.brand,
  icon
}: ContentCardProps) {
  const getIcon = () => {
    if (imageContainer) return imageContainer;
    
    switch (icon) {
      // Partes do cérebro
      case 'cerebro_emocional':
        return <Brain color={colors.textOnDark} size={32} />;
      case 'sistema_limbico':
        return <Activity color={colors.textOnDark} size={32} />;
      case 'amigdala':
        return <Brain color={colors.textOnDark} size={32} />;
      case 'hipocampo':
        return <Heart color={colors.textOnDark} size={32} />;
      
      // Neurotransmissores
      case 'neurotransmissores':
        return <Zap color={colors.textOnDark} size={32} />;
      case 'dopamina':
        return <Zap color={colors.textOnDark} size={32} />;
      case 'serotonina':
        return <Heart color={colors.textOnDark} size={32} />;
      case 'adrenalina':
        return <Flame color={colors.textOnDark} size={32} />;
      case 'gaba':
        return <Shield color={colors.textOnDark} size={32} />;
      case 'glutamato':
        return <Activity color={colors.textOnDark} size={32} />;
      
      // Emoções
      case 'emocoes':
        return <Smile color={colors.textOnDark} size={32} />;
      case 'alegria':
        return <Smile color={colors.textOnDark} size={32} />;
      case 'tristeza':
        return <Frown color={colors.textOnDark} size={32} />;
      case 'raiva':
        return <Angry color={colors.textOnDark} size={32} />;
      case 'medo':
        return <AlertTriangle color={colors.textOnDark} size={32} />;
      case 'amor':
        return <Heart color={colors.textOnDark} size={32} />;
      
      default:
        return <Brain color={colors.textOnDark} size={32} />;
    }
  };

  return (
    <TouchableOpacity style={styles.brainPartCard} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.brainImageContainer, { backgroundColor: imageContainerColor }]}>
        {getIcon()}
      </View>
      <View style={styles.brainInfo}>
        <Text style={styles.brainPartTitle}>{title}</Text>
        <Text style={styles.brainPartText}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  brainPartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingBottom: 25,
  },
  brainImageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  brainInfo: {
    marginLeft: 16,
    flex: 1,
  },
  brainPartTitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'left',
  },
  brainPartText: {
    fontWeight: '300',
    fontSize: 12,
    color: '#333',
    textAlign: 'left',
  },
});
