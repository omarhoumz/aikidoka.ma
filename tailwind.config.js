/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [addVariablesForColors],
}

function flattenColorPalette(colors) {
  return Object.entries(colors).reduce((acc, [colorName, values]) => {
    const colorValues = Object.entries(values).reduce((acc, [key, value]) => {
      return { ...acc, [`${colorName}-${key}`]: value }
    }, {})
    return { ...acc, ...colorValues }
  }, {})
}

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme('colors', {}))
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([colorName, colorValue]) => [
      `--${colorName}`,
      colorValue,
    ]),
  )

  addBase({ ':root': newVars })
}
