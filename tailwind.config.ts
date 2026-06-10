
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Hybrid Design System
        bg: {
          primary: '#0D0F14',
          secondary: '#141720',
          card: '#1A1E2A',
          hover: '#1F2433',
        },
        accent: {
          teal: '#00D4B4',
          teal_dim: '#00D4B420',
          red: '#FF4B6E',
          yellow: '#FFB800',
          green: '#00C48C',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#8B92A5',
          muted: '#4A5168',
        },
        border: {
          DEFAULT: '#252B3B',
          light: '#2E3548',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

export default config
