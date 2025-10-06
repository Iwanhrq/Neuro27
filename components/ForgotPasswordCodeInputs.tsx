import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../constants/colors';
import { fontFamily } from '../constants/fonts';

interface ForgotPasswordCodeInputsProps {
  length?: number;
  onCodeChange?: (code: string) => void;
}

export default function ForgotPasswordCodeInputs({ 
  length = 4, 
  onCodeChange 
}: ForgotPasswordCodeInputsProps) {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Notificar mudança do código completo
    onCodeChange?.(newCode.join(''));

    // Mover para o próximo input
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.codeContainer}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          value={digit}
          onChangeText={(text) => handleChange(text.replace(/[^0-9]/g, ''), index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          maxLength={1}
          keyboardType="number-pad"
          style={styles.codeInput}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 13,
    marginBottom: 10,
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
