/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/Fundo.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 10.08%, #43E7AD 50.94%, #E1D55D 90.57%);',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%);'
      },
    },
  },
  plugins: [],
}
