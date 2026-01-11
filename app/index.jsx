import { StyleSheet, Text, View, Image } from 'react-native'
import Logo from '../assets/LogoVilla.png'
import NavBar from '../components/NavBar'

const HomePage = () => {
    return (
        <View style={styles.container}>

            <Image source={Logo} style={{ width: 150, height: 150 }} />
            <Text style={styles.title}>Demo App</Text>
            <Text style={styles.subtitle}>In Progress!!</Text>

            <NavBar />
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