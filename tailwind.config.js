module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['kanit', 'sans-serif'],
      },
      colors: {
        'theme-background': '#524A4E',
        'theme-foreground': '#FDEFF4',
        'theme-accent-01': '#FF5C8D',
        'theme-cream': '#F6E7D8',
        'theme-dark-cream': '#cabeb2',
        'theme-red': '#F68989',
        'theme-dark-red': '#C65D7B',
        'theme-brown': '#874356',
      },
    },
  },
  plugins: [],
};
