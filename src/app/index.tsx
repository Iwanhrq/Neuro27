import { useState } from 'react';
import Colors from '@/src/constants/colors';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { supabase } from '../lib/supabase';
import { router } from 'expo-router'


export default function Login() {

    const Fundo = require('../../assets/images/fundo.png');

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSignIn() {
        setLoading(true)

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            Alert.alert('Error', error.message)
            setLoading(false)
            return
        }

        setLoading(false);
        router.replace('/(panel)/profile/page')

    }

    return (
        <View style={styles.mainContainer}>

            <View>
                <ImageBackground source={Fundo} style={styles.imageBackground} resizeMode="cover">
                    <Text style={styles.textHeader}>Bem-vindo(a) de volta!</Text>
                </ImageBackground>
            </View>


            <View style={styles.container}>

                <Text style={styles.textTitle}>Login</Text>

                <TextInput
                    placeholder="Email"
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

                <TouchableOpacity style={styles.button} onPress={handleSignIn} >
                    <Text style={styles.textButton}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </Text>
                </TouchableOpacity>



                <Link href='/(auth)/signup/page' style={styles.link}>
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