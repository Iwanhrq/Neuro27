import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  marginBottom?: number;
  width?: any;
}

export default function CustomInput({ 
  style, 
  marginBottom = 32, 
  width,
  ...props 
}: CustomInputProps) {
  return (
    <TextInput
      style={[styles.input, { marginBottom }, width ? { width } : {}, style]}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
