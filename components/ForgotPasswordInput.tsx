import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import colors from '../constants/colors';
import { fontFamily } from '../constants/fonts';

interface ForgotPasswordInputProps extends TextInputProps {
  label?: string;
  variant?: 'default' | 'code';
  style?: any;
  rightIcon?: React.ReactNode;
}

export default function ForgotPasswordInput({ 
  label, 
  variant = 'default', 
  style,
  rightIcon,
  ...props 
}: ForgotPasswordInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            variant === 'code' ? styles.codeInput : styles.defaultInput,
            rightIcon && styles.inputWithIcon,
            style
          ]}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
        {rightIcon && (
          <View style={styles.iconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
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
    color: colors.textOnDark,
    marginBottom: 8,
    marginTop: 20,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
  defaultInput: {
    height: 55,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  inputWithIcon: {
    paddingRight: 50,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInput: {
    width: 70,
    height: 75,
    color: colors.textOnDark,
    fontSize: 20,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.outline,
  },
});
