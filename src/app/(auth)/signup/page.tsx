import { useState } from 'react';
import Colors from '@/src/constants/colors';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '../../../lib/supabase'

export default function SignUp() {

    const Fundo = require('../../../../assets/images/fundo.png');

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSignUp() {
        setLoading(true)

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        })

        if (error) {
            Alert.alert('Error', error.message)
            setLoading(false)
            return
        }

        setLoading(false)
        router.replace('/')
    }

    return (

        <View style={styles.mainContainer}>

            {/* Fundo Azul */}
            <View>
                <ImageBackground source={Fundo} style={styles.imageBackground} resizeMode="cover">
                    <Text style={styles.textHeader}>Bem-vindo(a)</Text>
                </ImageBackground>
            </View>
            <View style={styles.container}>
                <Text style={styles.textTitle}>Cadastre-se</Text>

                <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#828282"
                    style={styles.input}
                />

                <TextInput
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#828282"
                    style={styles.input}
                />

                <TextInput
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#828282"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.textButton}>
                        {loading ? 'Carregando...' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>

                <Link href='/' style={styles.link}>
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