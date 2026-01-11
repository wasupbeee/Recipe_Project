import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'

const contacts = () => {
    const { colors } = useTheme()

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>This is the contacts page!</Text>
        </View>
    )
}

export default contacts

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
    },

    subtitle: {
        color: '#000000c5',
    },
})