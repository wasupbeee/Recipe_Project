import { StyleSheet, View, Pressable } from 'react-native'
import { Link, usePathname } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const NavBar = () => {
    const pathname = usePathname()

    const navItems = [
        { href: '/', icon: 'home-outline', activeIcon: 'home' },
        { href: '/about', icon: 'information-circle-outline', activeIcon: 'information-circle' },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.pillContainer}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.href} href={item.href} asChild>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.iconButton,
                                    isActive && styles.activeButton,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <Ionicons
                                    name={isActive ? item.activeIcon : item.icon}
                                    size={24}
                                    color={isActive ? '#fff' : '#888'}
                                />
                            </Pressable>
                        </Link>
                    )
                })}
            </View>
        </View>
    )
}

export default NavBar

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    },

    pillContainer: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },

    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    activeButton: {
        backgroundColor: '#22c55e',
    },

    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.95 }],
    },
})
