import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Temporary authentication check - replace with your actual auth logic
  useEffect(() => {
    // For now, we'll just set it to true to show the tabs
    setIsAuthenticated(true);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="(panel)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </>
  );
}
