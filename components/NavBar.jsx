import { useRef, useCallback, useEffect } from 'react'
import { StyleSheet, View, Pressable, PanResponder, Animated } from 'react-native'
import { Link, usePathname, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../context/ThemeContext'

const routes = ['/', '/about', '/contacts', '/settings']

// Animated nav item component with scale and glow effects
const AnimatedNavItem = ({ item, isActive, isDarkMode }) => {
    const scaleAnim = useRef(new Animated.Value(isActive ? 1.15 : 1)).current
    const glowAnim = useRef(new Animated.Value(0.3)).current
    const glowAnimation = useRef(null)

    useEffect(() => {
        if (isActive) {
            // Scale up animation
            Animated.spring(scaleAnim, {
                toValue: 1.15,
                friction: 5,
                tension: 100,
                useNativeDriver: false,
            }).start()

            // Start glow pulse animation
            glowAnimation.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 0.9,
                        duration: 800,
                        useNativeDriver: false,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0.3,
                        duration: 800,
                        useNativeDriver: false,
                    }),
                ])
            )
            glowAnimation.current.start()
        } else {
            // Scale down animation
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 100,
                useNativeDriver: false,
            }).start()

            // Stop glow animation
            if (glowAnimation.current) {
                glowAnimation.current.stop()
                glowAnim.setValue(0.3)
            }
        }

        return () => {
            if (glowAnimation.current) {
                glowAnimation.current.stop()
            }
        }
    }, [isActive])

    return (
        <Link href={item.href} asChild>
            <Pressable>
                <Animated.View
                    style={[
                        styles.iconButton,
                        isActive && styles.activeButton,
                        {
                            transform: [{ scale: scaleAnim }],
                        },
                        isActive && {
                            shadowColor: '#5D3A1A',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: glowAnim,
                            shadowRadius: 12,
                        },
                    ]}
                >
                    <Ionicons
                        name={isActive ? item.activeIcon : item.icon}
                        size={24}
                        color={isActive ? '#5D3A1A' : (isDarkMode ? '#a0a0a0' : '#888')}
                    />
                </Animated.View>
            </Pressable>
        </Link>
    )
}

const NavBar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { isDarkMode } = useTheme()

    // Refs for scrubbing navigation
    const pillRef = useRef(null)
    const navbarLayout = useRef({ x: 0, width: 0 })
    const lastNavigatedIndex = useRef(-1)

    // Measure navbar position on layout
    const handleLayout = useCallback(() => {
        if (pillRef.current) {
            pillRef.current.measureInWindow((x, y, width, height) => {
                navbarLayout.current = { x, width }
            })
        }
    }, [])

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 15 && Math.abs(gestureState.dy) < 30
            },
            onPanResponderMove: (_, gestureState) => {
                // Calculate which zone the finger is in
                const touchX = gestureState.moveX - navbarLayout.current.x
                const zoneWidth = navbarLayout.current.width / routes.length
                const newIndex = Math.floor(touchX / zoneWidth)
                const clampedIndex = Math.max(0, Math.min(routes.length - 1, newIndex))

                // Navigate if we've moved to a different zone
                if (clampedIndex !== lastNavigatedIndex.current) {
                    lastNavigatedIndex.current = clampedIndex
                    router.replace(routes[clampedIndex])
                }
            },
            onPanResponderRelease: () => {
                // Reset tracking when finger is lifted
                lastNavigatedIndex.current = -1
            },
        })
    ).current

    const navItems = [
        { href: '/', icon: 'home-outline', activeIcon: 'home' },
        { href: '/about', icon: 'information-circle-outline', activeIcon: 'information-circle' },
        { href: '/contacts', icon: 'people-outline', activeIcon: 'people' },
        { href: '/settings', icon: 'settings-outline', activeIcon: 'settings' },
    ]

    return (
        <View style={styles.container}>
            <View
                ref={pillRef}
                onLayout={handleLayout}
                style={[styles.pillContainer, { backgroundColor: isDarkMode ? '#2d2d2d' : '#f5f5f5' }]}
                {...panResponder.panHandlers}
            >
                {navItems.map((item) => (
                    <AnimatedNavItem
                        key={item.href}
                        item={item}
                        isActive={pathname === item.href}
                        isDarkMode={isDarkMode}
                    />
                ))}
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
        // No background - glow effect only
    },

    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.95 }],
    },
})
