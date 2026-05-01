/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'meowthBeige': '#F4F1EA',
                'meowthYellow': '#F4CE14',
                'darkText': '#332D28',
                'cardColour': '#FFFFFF'
            }
        },
    },
    plugins: [],
}