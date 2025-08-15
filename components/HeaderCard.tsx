import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface HeaderCardProps {
  title?: string;
  height?: number;
  variant?: 'default' | 'dark';
}

export default function HeaderCard({ 
  title, 
  height = 220,
  variant = 'default'
}: HeaderCardProps) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[
      styles.carouselWrapper,
      variant === 'dark' && styles.darkWrapper
    ]}>
      <View style={[
        styles.brainCard, 
        { 
          width: screenWidth, 
          height,
          backgroundColor: variant === 'dark' ? '#001B29' : '#ABD4FC',
          marginRight: variant === 'dark' ? 0 : 20,
          borderRadius: variant === 'dark' ? 0 : 12,
        }
      ]}>
        {variant === 'default' && title && (
          <Text style={styles.brainName}>{title}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselWrapper: {
    position: 'relative',
  },
  darkWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  brainCard: {
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
