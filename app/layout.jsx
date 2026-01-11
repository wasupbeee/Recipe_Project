import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'


const rootLayout = () => {
    return (
        <View style={{ flex: 1 }}>
            <Stack />
            <Text>Footer</Text>
        </View>
    )
}

export default rootLayout

const styles = StyleSheet.create({})