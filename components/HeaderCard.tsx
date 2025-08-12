import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface HeaderCardProps {
  title: string;
  height?: number;
}

export default function HeaderCard({ 
  title, 
  height = 200 
}: HeaderCardProps) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.carouselWrapper}>
      <View style={[styles.brainCard, { width: screenWidth - 40, height }]}>
        <Text style={styles.brainName}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselWrapper: {
    marginTop: 60,
    position: 'relative',
  },
  brainCard: {
    marginRight: 20,
    backgroundColor: '#ABD4FC',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brainName: {
    color: '#001B29',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
  },
});
