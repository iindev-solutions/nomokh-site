import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0D10',
        graphite: '#14181E',
        line: '#2A313A',
        bone: '#EEE8DE',
        steel: '#AAA292',
        brass: '#B08D57',
        silver: '#C8D4E3',
        ember: '#B15B55',
        moss: '#6E8778',
        charcoal: '#14181E',
        'steel-dark': '#6F776F',
        forge: '#B08D57',
        'forge-soft': '#D1B27B',
        birch: '#EEE8DE'
      },
      fontFamily: {
        display: ['Prata', 'Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
      },
      boxShadow: { blade: '0 24px 80px rgba(0,0,0,.45)' }
    }
  },
  plugins: []
}
