import React from "react";
import { View, TextInput, Text, StyleSheet, TextInputProps } from "react-native";
import colors from "../constants/colors";
import { fontFamily } from "../constants/fonts";

interface ForgotPasswordInputProps extends TextInputProps {
  label?: string;
  error?: string | null;
  rightIcon?: React.ReactNode;
}

export default function ForgotPasswordInput({
  label,
  error,
  rightIcon,
  style,
  ...rest
}: ForgotPasswordInputProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textSecondary}
          {...rest}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamily.semibold,
    color: colors.textOnDark,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceDark,
    borderWidth: 1,
    borderColor: colors.inactive,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  input: {
    flex: 1,
    color: colors.textOnDark,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 10,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    marginTop: 5,
    fontFamily: fontFamily.regular,
  },
});
