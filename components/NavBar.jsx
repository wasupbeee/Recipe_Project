// useRef - Stores values that persist between re-renders (used for swipe detection)
import { useRef } from 'react'
// StyleSheet, View, Pressable - Building blocks for UI (like divs in web)
// PanResponder - Detects finger swipe gestures
import { StyleSheet, View, Pressable, PanResponder } from 'react-native'
// Link - Makes things clickable to navigate
// usePathname - Gets current page URL (e.g., "/about")
// useRouter - Lets us navigate to other pages programmatically
import { Link, usePathname, useRouter } from 'expo-router'
// Ionicons - A library of icons (home, info, people icons)
import { Ionicons } from '@expo/vector-icons'

// List of all pages in order - tells swipe logic which page comes before/after
const routes = ['/', '/about', '/contacts']

const NavBar = () => {
    // Gets current page URL (e.g., "/about")
    const pathname = usePathname()
    // Lets us navigate to other pages
    const router = useRouter()
    // Finds position in routes array (0 = Home, 1 = About, 2 = Contacts)
    const currentIndex = routes.indexOf(pathname)

    // PanResponder handles swipe gestures
    const panResponder = useRef(
        PanResponder.create({
            // Don't capture simple taps
            onStartShouldSetPanResponder: () => false,

            // "Should I track this gesture?"
            // Only if horizontal movement > 15px and vertical < 30px
            // This prevents accidental swipes when scrolling
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // gestureState.dx = horizontal distance moved (positive = right, negative = left)
                // gestureState.dy = vertical distance moved
                return Math.abs(gestureState.dx) > 15 && Math.abs(gestureState.dy) < 30
            },

            // When finger lifts off screen
            onPanResponderRelease: (_, gestureState) => {
                // Minimum distance needed to trigger navigation
                const swipeThreshold = 50

                // Swipe RIGHT (dx > 50) and not on first page → go to previous page
                if (gestureState.dx > swipeThreshold && currentIndex > 0) {
                    router.replace(routes[currentIndex - 1])
                }
                // Swipe LEFT (dx < -50) and not on last page → go to next page
                else if (gestureState.dx < -swipeThreshold && currentIndex < routes.length - 1) {
                    router.replace(routes[currentIndex + 1])
                }
            },
        })
    ).current

    // List of nav buttons - each has a link, inactive icon, and active icon
    const navItems = [
        { href: '/', icon: 'home-outline', activeIcon: 'home' },
        { href: '/about', icon: 'information-circle-outline', activeIcon: 'information-circle' },
        { href: '/contacts', icon: 'people-outline', activeIcon: 'people' },
    ]

    return (
        // Outer container - positions navbar at bottom of screen
        <View style={styles.container}>
            {/* Pill-shaped container - also has swipe handlers attached */}
            <View style={styles.pillContainer} {...panResponder.panHandlers}>
                {/* Loop through each nav item and create a button */}
                {navItems.map((item) => {
                    // Check if current page matches this button's link
                    const isActive = pathname === item.href
                    return (
                        // Link makes the icon tappable and navigates when pressed
                        // asChild passes the Link's behavior to the Pressable
                        <Link key={item.href} href={item.href} asChild>
                            {/* Pressable - a touchable button wrapper */}
                            <Pressable
                                style={({ pressed }) => [
                                    styles.iconButton,           // Base circular button style
                                    isActive && styles.activeButton,  // Green background if active
                                    pressed && styles.pressed,   // Shrink effect when pressed
                                ]}
                            >
                                {/* The actual icon - filled if active, outline if not */}
                                <Ionicons
                                    name={isActive ? item.activeIcon : item.icon}
                                    size={24}
                                    color={isActive ? '#fff' : '#888'}  // White if active, gray if not
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
    // Outer container - floats at bottom of screen
    container: {
        position: 'absolute',  // Floats over content
        bottom: 40,            // 40px from bottom of screen
        left: 0,               // Stretch full width
        right: 0,
        alignItems: 'center',  // Centers the pill horizontally
    },

    // The rounded pill shape containing the icons
    pillContainer: {
        flexDirection: 'row',       // Icons sit side-by-side
        backgroundColor: '#f5f5f5', // Light gray background
        borderRadius: 30,           // Makes it pill-shaped
        paddingVertical: 10,        // Padding top and bottom
        paddingHorizontal: 20,      // Padding left and right
        gap: 20,                    // Space between icons
        // Shadow properties for depth effect
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,  // Android shadow
    },

    // Each icon button - circular shape
    iconButton: {
        width: 44,                  // Square button
        height: 44,
        borderRadius: 22,           // Half of width/height = perfect circle
        justifyContent: 'center',   // Centers icon vertically
        alignItems: 'center',       // Centers icon horizontally
    },

    // Green circle for the active/current page
    activeButton: {
        backgroundColor: '#22c55e', // Green color
    },

    // Visual feedback when button is pressed
    pressed: {
        opacity: 0.7,                      // Fades slightly
        transform: [{ scale: 0.95 }],      // Shrinks slightly
    },
})
