import { Stack, router } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Componente principal que envolve toda a aplicação
// Ele fornece o contexto de autenticação para todos os componentes filhos
export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

// Componente que gerencia a navegação e o estado de autenticação
function MainLayout() {
  // Hook personalizado que nos dá acesso às funções de autenticação
  const { setAuth } = useAuth()

  useEffect(() => {
    // Listener que monitora mudanças no estado de autenticação do Supabase
    // Isso é importante porque o estado pode mudar em diferentes situações:
    // 1. Usuário faz login
    // 2. Usuário faz logout
    // 3. Token expira
    // 4. Página é recarregada
    supabase.auth.onAuthStateChange((_event, session) => {
      if(session){
        // Se existe uma sessão, significa que o usuário está logado
        setAuth(session.user)
        // Redirecionamos para a área logada
        router.replace('/(panel)/home' as any)
        return
      }
      // Se não existe sessão, significa que o usuário não está logado
      setAuth(null)
      // Redirecionamos para a tela de login
      router.replace('/(auth)/signin' as any)
    })
  }, []) // Array vazio significa que o useEffect só roda uma vez quando o componente monta

  return (
    // Stack é um navegador que permite empilhar telas
    // Cada Screen é uma tela disponível na aplicação
    <Stack>
      {/* Telas públicas (não precisam de autenticação) */}
      <Stack.Screen
        name="(auth)/signin"
        options={{ headerShown: false }} // Esconde o cabeçalho padrão
      />
      <Stack.Screen
        name="(auth)/signup"
        options={{ headerShown: false }}
      />
      
      {/* Telas privadas (precisam de autenticação) */}
      <Stack.Screen
        name="(panel)"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}