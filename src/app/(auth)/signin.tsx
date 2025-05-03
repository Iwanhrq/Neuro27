import { useState } from 'react';
import Colors from '@/src/constants/colors';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function SignIn() {
    // Imagem de fundo da tela
    const Fundo = require('../../../assets/images/fundo.png');

    // Estados para controlar os campos do formulário
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // Função que realiza o login do usuário
    async function handleSignIn() {
        setLoading(true) // Ativa o indicador de carregamento

        // Chama a função de login do Supabase
        // O Supabase vai:
        // 1. Verificar se o email e senha estão corretos
        // 2. Gerar um token de acesso (JWT)
        // 3. Retornar os dados do usuário ou um erro
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            // Se houver erro (credenciais inválidas, etc), mostra uma mensagem
            Alert.alert('Error', error.message)
            setLoading(false)
            return
        }

        // Se o login for bem sucedido:
        // 1. O Supabase emite um evento de mudança de estado de autenticação
        // 2. O listener no _layout.tsx captura esse evento
        // 3. O usuário é redirecionado automaticamente para o perfil
        setLoading(false);
        router.replace('/(panel)/home' as any)
    }

    return (
        <View style={styles.mainContainer}>
            {/* Seção superior com imagem de fundo */}
            <View>
                <ImageBackground source={Fundo} style={styles.imageBackground} resizeMode="cover">
                    <Text style={styles.textHeader}>Bem-vindo(a) de volta!</Text>
                </ImageBackground>
            </View>

            {/* Formulário de login */}
            <View style={styles.container}>
                <Text style={styles.textTitle}>Login</Text>

                {/* Campo de email */}
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#828282"
                    style={styles.input}
                />

                {/* Campo de senha */}
                <TextInput
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#828282"
                    secureTextEntry
                    style={styles.input}
                />

                {/* Botão de login */}
                <TouchableOpacity style={styles.button} onPress={handleSignIn} >
                    <Text style={styles.textButton}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </Text>
                </TouchableOpacity>

                {/* Link para a tela de cadastro */}
                <Link href={'/(auth)/signup' as any} style={styles.link}>
                    Ainda não possui uma conta?
                    <Text style={{ color: 'purple' }}> Cadastre-se.</Text>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    imageBackground: {
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 32,
        color: 'white'
    },
    container: {
        marginTop: -80,
        backgroundColor: '#F6F8FB',
        padding: 20,
        flex: 1,
        paddingTop: 40,
        borderTopLeftRadius: 80,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        paddingVertical: 40
    },
    input: {
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        padding: 10,
        marginTop: 40,
        color: '#000'
    },
    button: {
        backgroundColor: '#ABD4FC',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 50,
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
    },
    link: {
        paddingTop: 140,
        textAlign: 'center',
    }
}); 