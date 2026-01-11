import { StyleSheet, Text, View, Switch } from 'react-native'
import { useTheme } from '../context/ThemeContext'

const settings = () => {
    const { isDarkMode, toggleDarkMode, colors } = useTheme()

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

            <View style={[styles.settingRow, { backgroundColor: colors.card }]}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: '#767577', true: '#22c55e' }}
                    thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
                />
            </View>
        </View>
    )
}

export default settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },

    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
    },

    settingLabel: {
        fontSize: 16,
    },
})
