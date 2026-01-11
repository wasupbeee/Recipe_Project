import { StyleSheet, Text, View, Switch, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { useTheme } from '../context/ThemeContext'

const settings = () => {
    const { isDarkMode, toggleDarkMode, colors } = useTheme()

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.settingRow}>
                    <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        trackColor={{ false: '#767577', true: '#22c55e' }}
                        thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
                    />
                </View>

                <View style={[styles.divider, { backgroundColor: colors.background }]} />

                <Link href="/(auth)/login" asChild>
                    <Pressable style={styles.settingRow}>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>Login / Register</Text>
                        <Text style={{ color: colors.textSecondary, fontSize: 18 }}>›</Text>
                    </Pressable>
                </Link>
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

    card: {
        borderRadius: 12,
        overflow: 'hidden',
    },

    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },

    divider: {
        height: 1,
        marginHorizontal: 16,
    },

    settingLabel: {
        fontSize: 16,
    },
})
