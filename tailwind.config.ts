import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0C',
        charcoal: '#151516',
        steel: '#A8B0B8',
        'steel-dark': '#59636D',
        forge: '#D97925',
        'forge-soft': '#F2B76B',
        birch: '#F4E9D8',
        bone: '#FFF8EA'
      },
      boxShadow: { blade: '0 24px 80px rgba(0,0,0,.45)' }
    }
  },
  plugins: []
}
