import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { fontFamily } from '../constants/fonts';

interface CustomInputProps extends TextInputProps {
  marginBottom?: number;
  width?: any;
  error?: string;
}

export default function CustomInput({ 
  style, 
  marginBottom = 32, 
  width,
  error,
  ...props 
}: CustomInputProps) {
  return (
    <View style={[styles.container, { marginBottom }, width ? { width } : {}]}>
      <TextInput
        style={[
          styles.input, 
          error && styles.inputError,
          style
        ]}
        placeholderTextColor="#999"
        {...props}
      />
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container para agrupar input e mensagem de erro
  },
  input: {
    height: 45,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontFamily: fontFamily.regular,
    marginTop: 4,
    marginLeft: 4,
  },
});
