import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev)
    }

    const theme = {
        isDarkMode,
        toggleDarkMode,
        colors: isDarkMode
            ? {
                background: '#1a1a1a',
                text: '#ffffff',
                textSecondary: '#a0a0a0',
                card: '#2d2d2d',
            }
            : {
                background: '#ffffff',
                text: '#000000c5',
                textSecondary: '#666666',
                card: '#f5f5f5',
            },
    }

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
