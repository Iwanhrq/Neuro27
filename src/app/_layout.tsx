import { Stack, router } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

function MainLayout() {
  const { setAuth } = useAuth()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
    
      if(session){
        setAuth(session.user)
        router.replace('/(panel)/profile/page')
        return
      }
      setAuth(null)
      router.replace('/')
    })
  }, [])


  return (
    <Stack>
      {/* Login */}
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      {/* Cadastro*/}
      <Stack.Screen
        name="(auth)/signup/page"
        options={{ headerShown: false }}
      />
      {/*Tela Perfil*/}
      <Stack.Screen
        name="(panel)/profile/page"
        options={{ headerShown: false }}
      />

    </Stack>
  )
}