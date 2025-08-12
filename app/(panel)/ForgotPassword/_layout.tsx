import { Stack } from "expo-router"

export default function ForgotPasswordLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="ForgotPasswordEmail"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ForgotPasswordCode"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ForgotPasswordReset"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}
