import { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native'
import Logo from '../../assets/LogoVilla.png'
import { useTheme } from '../../context/ThemeContext'

const Login = () => {
    const { colors } = useTheme()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        // Placeholder - will implement later
    }

    const handleRegister = () => {
        // Placeholder - will implement later
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image source={Logo} style={styles.logo} />

            <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Sign in to continue
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: colors.card,
                            color: colors.text,
                            borderColor: colors.textSecondary,
                        }
                    ]}
                    placeholder="Username"
                    placeholderTextColor={colors.textSecondary}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: colors.card,
                            color: colors.text,
                            borderColor: colors.textSecondary,
                        }
                    ]}
                    placeholder="Password"
                    placeholderTextColor={colors.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />

                <Pressable
                    style={({ pressed }) => [
                        styles.loginButton,
                        { opacity: pressed ? 0.8 : 1 }
                    ]}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
            </View>

            <View style={styles.registerContainer}>
                <Text style={[styles.registerText, { color: colors.textSecondary }]}>
                    Don't have an account?
                </Text>
                <Pressable onPress={handleRegister}>
                    <Text style={styles.registerLink}> Register</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
        paddingHorizontal: 20,
    },

    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        marginBottom: 40,
    },

    inputContainer: {
        width: '100%',
        gap: 16,
    },

    input: {
        width: '100%',
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
    },

    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#22c55e',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },

    loginButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },

    registerContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },

    registerText: {
        fontSize: 14,
    },

    registerLink: {
        fontSize: 14,
        color: '#22c55e',
        fontWeight: '600',
    },
})
