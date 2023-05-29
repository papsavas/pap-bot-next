const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			...colors,
			form: {
				bg: colors.gray[300],
				bgDark: colors.zinc[500],
				text: colors.gray[800],
				textDark: colors.gray[200],
				input: colors.slate[50],
				inputDark: colors.neutral[800],
				inputText: colors.black,
				inputTextDark: colors.neutral[300],
				submit: colors.gray[600],
				submitDark: colors.neutral[100],
				submitText: colors.white,
				submitTextDark: colors.gray[800],
				border: colors.gray[400],
				borderDark: colors.gray[400],
			},
			lightText: colors.neutral[900],
			darkText: colors.neutral[300],
			lightBg: colors.white,
			darkBg: colors.neutral[700],
			success: colors.green[500],
			error: colors.red[400],
		},

		extend: {},
	},
	plugins: [],
};
