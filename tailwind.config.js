/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display sizes with [fontSize, { lineHeight, fontWeight }]
        'display-2xl': ['72px', { lineHeight: '90px', fontWeight: '600' }],
        'display-xl': ['60px', { lineHeight: '72px', fontWeight: '600' }],
        'display-lg': ['48px', { lineHeight: '60px', fontWeight: '600' }],
        'display-md': ['36px', { lineHeight: '44px', fontWeight: '600' }],

        // Headings with [fontSize, { lineHeight, fontWeight }]
        'h1': ['30px', { lineHeight: '38px', fontWeight: '600' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h4': ['18px', { lineHeight: '26px', fontWeight: '600' }],

        // Body text with [fontSize, { lineHeight, fontWeight }]
        'body-xl': ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-xs': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
