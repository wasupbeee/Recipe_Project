import { StyleSheet, Text, View } from 'react-native'
import NavBar from '../components/NavBar'

const about = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is the about page</Text>

            <NavBar />
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
    },

    subtitle: {
        color: '#000000c5',
    },
})