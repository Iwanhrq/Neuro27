import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface HomeHeaderCardProps {
  title: string;
  height?: number;
}

export default function HomeHeaderCard({ 
  title, 
  height = 200 
}: HomeHeaderCardProps) {
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
