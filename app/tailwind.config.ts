import type { Config } from "tailwindcss"

const config = {
  darkMode: "selector",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    ],
  prefix: "",
  theme: {
    colors: {
      'pBlue':'#2E3B52',
      'sBlue':'#232D41',
      'pBeige':'#FFE3CB',
      'sBeige': '#FFF1E5',
      'tBeige': '#FFF9F5',
      'pBrown': '#9D775D',
      'pWhite': '#ffffff',
      'transparent': 'rgba(255, 255, 255, 0)',
      'pGray': "#f1f1f1",
      'KolectorsRed': '#FF0000',
    },
    extend: {
      fontFamily: {
        title: ['var(--font-poppins)'],
        
      },
    },
  },
  
} satisfies Config

export default config