import React, { ReactNode } from 'react';
import {
    DimensionValue // 👇 1. Importar o tipo DimensionValue
    ,
    KeyboardTypeOptions,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    View
} from 'react-native';
import colors from '../constants/colors';
import { fontFamily } from '../constants/fonts';

interface CustomInputProps {
  error?: string;
  width?: DimensionValue; // 👇 2. Usar DimensionValue para a prop 'width'
  marginBottom?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;

  style?: StyleProp<TextStyle>; 
}

export default function CustomInput({
  error,
  width = '100%',
  marginBottom = 24,
  leftIcon,
  rightIcon,
  style,
  ...props
}: CustomInputProps) {
  return (
    // Esta linha agora é totalmente compatível com TypeScript
    <View style={{ width, marginBottom }}>
      
      <View style={[styles.inputContainer, error && styles.errorBorder]}>
        {leftIcon}
        
        <TextInput
          style={[
            styles.input,
            { marginLeft: leftIcon ? 10 : 0 },
            { marginRight: rightIcon ? 10 : 0 },
            style
          ]}
          placeholderTextColor="#999"
          {...props}
        />
        
        {rightIcon}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

// ... (seus estilos permanecem os mesmos)
const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.outline,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: 'black', // Ajuste a cor conforme seu tema
  },
  errorBorder: {
    borderColor: colors.danger,
    borderWidth: 1.5,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontFamily: fontFamily.regular,
    marginTop: 4,
    marginLeft: 4,
  },
});