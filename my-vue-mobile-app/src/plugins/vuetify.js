import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#FFBC2D',        // Next and Submit buttons
          secondary: '#6362F8',      // Back button
          tertiary: '#261C6B',       // Other buttons
          accent: '#FF883F',         // Highlight color
          error: '#FF5252',          // Error color
          info: '#2196F3',           // Info color
          success: '#4CAF50',        // Success color
          warning: '#FFC107',        // Warning color
          'on-primary': '#FFFFFF',  // Text color on primary background
          background: '#FFFFFF',    // Background color
          surface: '#FFFFFF',       // Surface color
          'primary-darken-1': '#5251d9',  // Hover color for primary
          'secondary-darken-1': '#1a144b',  // Hover color for secondary
        },
        variables: {
          'button-color': '#6362F8',
          'button-text-transform': 'none',
          'body-font-family': ['Roboto', 'sans-serif'],
          'heading-font-family': ['Roboto', 'sans-serif'],
        },
      },
      dark: {
        colors: {
          primary: '#8180FA',
          // ... other dark theme colors
        }
      }
    }
  },
  defaults: {
    VBtn: {
      color: 'primary', // Default button color
      height: '48px',
      rounded: 'lg',
      style: {
        textTransform: 'none',
        fontWeight: '600',
      }
    },
    VTextField: {
      color: 'primary',
      variant: 'outlined',
      density: 'comfortable',
    },
  }
});