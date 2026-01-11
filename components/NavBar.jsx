import { useRef } from 'react' // Stores values that persist between re-renders (used for swipe detection)
import { StyleSheet, View, Pressable, PanResponder } from 'react-native' // Building blocks for UI (like divs in web)
import { Link, usePathname, useRouter } from 'expo-router' //Navigation tools (like clicking links on a website)
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../context/ThemeContext'

const routes = ['/', '/about', '/contacts', '/settings'] // A simple list of all your pages in order. This tells the swipe logic which page comes before/after the current one.

const NavBar = () => {
    const pathname = usePathname() // Gets current page URL (e.g., "/about")
    const router = useRouter() // Navigation tools (like clicking links on a website)
    const { isDarkMode } = useTheme()
    const currentIndexRef = useRef(routes.indexOf(pathname)) // Use ref to always have fresh value
    currentIndexRef.current = routes.indexOf(pathname) // Update ref on every render

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 15 && Math.abs(gestureState.dy) < 30
            },
            onPanResponderRelease: (_, gestureState) => {
                const swipeThreshold = 50
                const currentIndex = currentIndexRef.current // Get fresh value from ref

                if (gestureState.dx > swipeThreshold && currentIndex > 0) {
                    router.replace(routes[currentIndex - 1]) // Go back one page
                } else if (gestureState.dx < -swipeThreshold && currentIndex < routes.length - 1) {
                    router.replace(routes[currentIndex + 1]) // Go forward one page
                }
            },
        })
    ).current

    const navItems = [
        { href: '/', icon: 'home-outline', activeIcon: 'home' }, // Home page icon
        { href: '/about', icon: 'information-circle-outline', activeIcon: 'information-circle' }, // About page icon
        { href: '/contacts', icon: 'people-outline', activeIcon: 'people' }, // Contacts page icon
        { href: '/settings', icon: 'settings-outline', activeIcon: 'settings' }, // Settings page icon
    ]

    return (
        <View style={styles.container}>
            <View style={[styles.pillContainer, { backgroundColor: isDarkMode ? '#2d2d2d' : '#f5f5f5' }]} {...panResponder.panHandlers}>
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
                                    color={isActive ? '#5D3A1A' : (isDarkMode ? '#a0a0a0' : '#888')}
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
