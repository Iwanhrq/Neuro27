import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import colors from '../constants/colors';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
  showLogo?: boolean;
  headerText?: string;
  headerHeight?: number;
  showBackButton?: boolean;
}

export default function AuthLayout({ 
  children, 
  showLogo = false, 
  headerText = 'Neuro27',
  headerHeight = 280,
  showBackButton = false
}: AuthLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ImageBackground
            source={require('../assets/images/fundo.png')}
            style={[styles.header, { height: headerHeight }]}
            resizeMode="cover"
          >
            {showBackButton && (
              <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(panel)/outset' as any)}>
                <Ionicons name="arrow-back" size={35} color="#fff" />
              </TouchableOpacity>
            )}
            {showLogo && (
              <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
              />
            )}
          </ImageBackground>

          <View style={styles.block}>
            <View style={styles.content}>
              {children}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    marginTop: 25,
    marginBottom: -15,
    width: 230,
    height: 230,
  },
  block: {
    backgroundColor: colors.backgroundSecondary
  },
  content: {
    paddingTop: 75,
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    borderTopLeftRadius: 80,
  },
});
