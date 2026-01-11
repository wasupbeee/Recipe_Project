import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'

const about = () => {
    const { colors } = useTheme()

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>This is the about page for {'\n'} Casa Rei Villa</Text>
        </View>
    )
}

export default about

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000c5',
        textAlign: 'center',
    },

    subtitle: {
        color: '#000000c5',
    },
})