import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import NavBar from '../components/NavBar'
import { ThemeProvider, useTheme } from '../context/ThemeContext'

const MainLayout = () => {
    const { isDarkMode, colors } = useTheme()

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                    animationDuration: 150,
                    contentStyle: { backgroundColor: colors.background },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="about" />
                <Stack.Screen name="contacts" />
                <Stack.Screen name="settings" />
            </Stack>
            <NavBar />
        </View>
    )
}

const rootLayout = () => {
    return (
        <ThemeProvider>
            <MainLayout />
        </ThemeProvider>
    )
}

export default rootLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})