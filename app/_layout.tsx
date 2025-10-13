import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../constants/firebase';
import { fonts } from '../constants/fonts';
import { ChapterProgressProvider } from '../contexts/ChapterProgressContext';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ChapterProgressProvider userId={auth.currentUser?.uid}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="(panel)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </ChapterProgressProvider>
  );
}
