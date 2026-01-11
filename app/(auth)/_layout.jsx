import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../../context/ThemeContext'

const AuthLayout = () => {
    const { isDarkMode, colors } = useTheme()

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                    animationDuration: 300,
                    contentStyle: { backgroundColor: colors.background },
                }}
            >
                <Stack.Screen name="login" />
            </Stack>
        </View>
    )
}

export default AuthLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
