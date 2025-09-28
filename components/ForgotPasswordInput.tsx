import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import colors from '../constants/colors';
import { fontFamily } from '../constants/fonts';

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
        placeholderTextColor={colors.textMuted}
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
    fontFamily: fontFamily.semibold,
    color: colors.textLight,
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
  defaultInput: {
    height: 55,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  codeInput: {
    width: 70,
    height: 75,
    color: colors.textLight,
    fontSize: 20,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
