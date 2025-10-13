import { Stack } from 'expo-router';

export default function PanelLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="outset"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordEmail"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 