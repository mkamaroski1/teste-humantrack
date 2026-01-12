/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores principais do projeto
        primary: {
          DEFAULT: '#292965',
          light: '#6868EE',
          border: '#7375FC',
          purple: '#7c7cff',
          dark: '#5451CF',
        },
        // Cores relacionadas à IA
        ai: {
          cyan: '#2dd4ff',
          green: '#4ef0a3',
          teal: '#5df2c9',
          blue: '#3bb8ff',
        },
        // Backgrounds customizados
        surface: {
          DEFAULT: '#F7F7FA',
          indigo: '#E9EBF8',
        },
        // Cores de texto neutras
                muted: {
                  DEFAULT: '#71717A',
                },
                input: '#F3F3F3',
              },
            },
          },
          plugins: [],
        }



