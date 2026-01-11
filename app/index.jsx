import { StyleSheet, Text, View, Image } from 'react-native'
import Logo from '../assets/LogoVilla.png'
import { useTheme } from '../context/ThemeContext'

const HomePage = () => {
    const { colors } = useTheme()

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <Image source={Logo} style={{ width: 150, height: 150 }} />
            <Text style={[styles.title, { color: colors.text }]}>Demo App</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>In Progress!</Text>
        </View>
    )
}

export default HomePage

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