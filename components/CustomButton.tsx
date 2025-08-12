import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  marginTop?: number;
  width?: any;
}

export default function CustomButton({ 
  title, 
  variant = 'primary', 
  marginTop = 8,
  width,
  style,
  ...props 
}: CustomButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        styles[variant], 
        { marginTop }, 
        width ? { width } : {},
        style
      ]} 
      {...props}
    >
      <Text style={[styles.buttonText, styles[`${variant}Text`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#ABD4FC',
  },
  secondary: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#A283C8',
  },
});
