module.exports = {
  important: true,
  mode: 'jit',
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.ts'
    ]
  },
  theme: {
    extend: {
      colors: {
        'spotify-green': {
          50: '#f2fcf7',
          100: '#d8f9ea',
          200: '#bdf6dd',
          300: '#a2f4d1',
          400: '#87f1c4',
          500: '#1ed760',
          600: '#69e9a6',
          700: '#50d787',
          800: '#38c568',
          900: '#1eae4a',
          A100: '#1ed760',
          A200: '#1ed760',
          A400: '#1ed760',
          A700: '#1ed760',
        },
      },
      keyframes: {
        'hover-up-down': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-5px)',
          },

          '80%': {
            transform: 'translateY(5px)',
          },
        },
        'rotator': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(270deg)',
          },
        },
        'colors': {
          '0%': {
            stroke: '#4285f4',
          },
          '25%': {
            stroke: '#de3e35',
          },
          '50%': {
            stroke: '#f7c223',
          },
          '75%': {
            stroke: '#1b9a59',
          },
          '100%': {
            stroke: '#4285f4',
          },
        },
        'dash': {
          '0%': {
            strokeDashoffset: 187,
          },
          '50%': {
            strokeDashoffset: '46.75',
            transform: 'rotate(135deg)',
          },
          '100%': {
            strokeDashoffset: 187,
            transform: 'rotate(450deg)',
          },
        },
      },
      animation: {
        'hover-up-down': 'hover-up-down 1s ease-in-out infinite',
        'spinner-dash': 'dash 1.4s ease-in-out infinite',
        'spinner-colors': 'colors 5.6s ease-in-out infinite',
        'spinner-rotator': 'rotator 1.4s linear infinite',
      },
    },
  },
  variants: {
    // Customize your variants here
  },
  plugins: [
    // Add your plugins here
  ],
  // Other configuration options...
};