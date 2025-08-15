import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface ForgotPasswordButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  containerStyle?: any;
  borderRadius?: number;
}

export default function ForgotPasswordButton({ 
  title, 
  variant = 'primary', 
  containerStyle,
  borderRadius,
  style,
  ...props 
}: ForgotPasswordButtonProps) {
  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <TouchableOpacity 
        style={[
          styles.button,
          variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
          borderRadius ? { borderRadius } : {},
          style
        ]} 
        {...props}
      >
        <Text style={[
          styles.buttonText,
          variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingBottom: 20,
  },
  button: {
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  primaryButton: {
    backgroundColor: '#ABD4FC',
  },
  secondaryButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: '#000',
  },
  secondaryButtonText: {
    color: '#000',
  },
});
