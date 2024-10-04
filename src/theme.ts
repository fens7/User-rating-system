import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'dark', // Встановлює темну тему як початкову
    useSystemColorMode: false, // Вимикає використання системних налаштувань
};

const theme = extendTheme({
    config,

    colors: {
        brand: {
            0: 'rgba(244, 244, 244, 0.5)',
            50: '#F4F4F4', // Білий для тексту
            100: '#A6A6A6', // Світло-сірий для менш важливих елементів
            200: '#D32F2F', // Насичений червоний для акцентів
            300: '#2E2E2E', // Середньо-сірий для карток або панелей
            400: '#1E1E1E', // Темно-сірий для основного фону
        },
    },
    styles: {
        global: {
            'html, body': {
                backgroundColor: 'brand.400', // Основний фон
                color: 'brand.50', // Основний колір тексту
            },
        },
    },

    components: {
        Input: {
            defaultProps: {
                focusBorderColor: 'brand.200',
            },
            baseStyle: {
                focusBorderColor: 'brand.200',
                field: {
                    _autofill: {
                        shadow: '2xl',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                },
            },
        },
    },
});

export default theme;
