module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#2563EB', // Primary
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0B1220', // New Dark Background
        },
        accent: {
          green: '#22C55E', // Accent
          teal: '#2dd4bf',
          pink: '#f472b6',
        },
        primary: '#2563EB', // Brand 600
        'primary-hover': '#1d4ed8', // Brand 700
        background: '#0B1220', // New Dark Background
        card: '#FFFFFF', // New White Card
        'card-dark': '#1e293b', // Option for dark card
        border: '#334155', // Navy 700
        text: '#FFFFFF', // White text on dark
        'text-muted': '#94a3b8', // Navy 400
        'text-dark': '#0F172A', // Text on light
        danger: '#ef4444',
        success: '#22C55E'
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial']
      },
      spacing: {
        // 8px base grid (rem = 16px)
        2: '0.5rem', // 8px
        4: '1rem',   // 16px
        6: '1.5rem', // 24px
        8: '2rem'
      },
      fontSize: {
        h1: ['36px', { lineHeight: '1.1' }],
        h2: ['28px', { lineHeight: '1.15' }],
        h3: ['22px', { lineHeight: '1.2' }],
        base: ['16px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.4' }]
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '2rem'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
      }
    }
  },
  plugins: []
}
