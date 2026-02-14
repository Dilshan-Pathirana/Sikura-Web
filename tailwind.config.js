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
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
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
          950: '#020617', // Deep space black
        },
        accent: {
          teal: '#2dd4bf',
          pink: '#f472b6',
          cyan: '#22d3ee',
        },
        primary: '#7C3AED', // Brand 600
        'primary-hover': '#6D28D9', // Brand 700
        background: '#020617', // Navy 950
        card: '#0f172a', // Navy 900
        border: '#1e293b', // Navy 800
        text: '#f8fafc', // Navy 50
        muted: '#94a3b8', // Navy 400
        danger: '#ef4444',
        success: '#10b981'
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
