import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ContentCardProps {
  title: string;
  description: string;
  onPress: () => void;
  imageContainer?: React.ReactNode;
  imageContainerColor?: string;
}

export default function ContentCard({ 
  title, 
  description, 
  onPress, 
  imageContainer,
  imageContainerColor = '#ABD4FC'
}: ContentCardProps) {
  return (
    <TouchableOpacity style={styles.brainPartCard} onPress={onPress}>
      <View style={[styles.brainImageContainer, { backgroundColor: imageContainerColor }]}>
        {imageContainer}
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
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
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
