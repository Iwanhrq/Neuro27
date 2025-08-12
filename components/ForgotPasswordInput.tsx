import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface ForgotPasswordInputProps extends TextInputProps {
  label?: string;
  variant?: 'default' | 'code';
  style?: any;
}

export default function ForgotPasswordInput({ 
  label, 
  variant = 'default', 
  style,
  ...props 
}: ForgotPasswordInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          variant === 'code' ? styles.codeInput : styles.defaultInput,
          style
        ]}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    fontSize: 16,
  },
  defaultInput: {
    height: 55,
    borderWidth: 1,
    borderColor: '#B5B5B5',
    paddingHorizontal: 16,
  },
  codeInput: {
    width: 70,
    height: 75,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#B5B5B5',
  },
});
