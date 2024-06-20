module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure you specify the correct paths for your project
  ],
  theme: {
    extend: {
      fontFamily: {
        'chivo-mono': ['"Chivo Mono"', 'monospace'],
      },
      colors: {
        slate: {
          900: '#1d1e1f', // Overriding bg-slate-900
        },
      },
    },
  },
  plugins: [],
};
