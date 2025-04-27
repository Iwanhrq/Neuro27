import { useState } from 'react';
import Colors from '@/src/constants/colors';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '../../lib/supabase'

export default function SignUp() {
    // Imagem de fundo da tela
    const Fundo = require('../../../assets/images/fundo.png');

    // Estados para controlar os campos do formulário
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // Função que realiza o cadastro do usuário
    async function handleSignUp() {
        setLoading(true) // Ativa o indicador de carregamento

        // Chama a função de signup do Supabase
        // O Supabase vai:
        // 1. Validar o email e senha
        // 2. Criar o usuário no banco de dados
        // 3. Enviar um email de confirmação
        // 4. Retornar os dados do usuário ou um erro
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            // Options permite enviar dados adicionais do usuário
            // Estes dados serão salvos na tabela de usuários do Supabase
            options: {
                data: {
                    name: name // Salvando o nome do usuário nos metadados
                }
            }
        })

        if (error) {
            // Se houver erro, mostra uma mensagem para o usuário
            Alert.alert('Error', error.message)
            setLoading(false)
            return
        }

        // Se o cadastro for bem sucedido, desativa o loading
        setLoading(false)
        // E redireciona para a tela de login para o usuário fazer o primeiro acesso
        router.replace('/(auth)/signin' as any)
    }

    return (
        <View style={styles.mainContainer}>
            {/* Seção superior com imagem de fundo */}
            <View>
                <ImageBackground source={Fundo} style={styles.imageBackground} resizeMode="cover">
                    <Text style={styles.textHeader}>Bem-vindo(a)</Text>
                </ImageBackground>
            </View>

            {/* Formulário de cadastro */}
            <View style={styles.container}>
                <Text style={styles.textTitle}>Cadastre-se</Text>

                {/* Campo de nome */}
                <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#828282"
                    style={styles.input}
                />

                {/* Campo de email */}
                <TextInput
                    placeholder="E-mail"
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

                {/* Botão de cadastro */}
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.textButton}>
                        {loading ? 'Carregando...' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>

                {/* Link para a tela de login */}
                <Link href={'/(auth)/signin' as any} style={styles.link}>
                    Já possui uma conta?
                    <Text style={{ color: 'purple' }}> Faça login.</Text>
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
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        paddingBottom: 64,
        fontSize: 32,
        color: 'white'
    },

    container: {
        marginTop: -80,
        backgroundColor: '#F6F8FB',
        padding: 20,
        flex: 1,
        paddingTop: 40,
        borderTopLeftRadius: 90,
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 40
    },
    input: {
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        padding: 10,
        marginBottom: 40,
        color: '#000'
    },
    button: {
        backgroundColor: '#ABD4FC',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
    },
    back: {
        textAlign: 'center'
    },
    link: {
        paddingTop: 200,
        textAlign: 'center',
    }
}); 