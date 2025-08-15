import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ContentCardProps {
  title: string;
  description: string;
  onPress: () => void;
  imageContainer?: React.ReactNode;
}

export default function ContentCard({ 
  title, 
  description, 
  onPress, 
  imageContainer 
}: ContentCardProps) {
  return (
    <TouchableOpacity style={styles.brainPartCard} onPress={onPress}>
      <View style={styles.brainImageContainer}>
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
    backgroundColor: '#ABD4FC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
