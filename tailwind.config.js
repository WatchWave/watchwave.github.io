/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';
module.exports = {
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		nextui({
			layout: {
				spacingUnit: 4, // in px
				disabledOpacity: '.5', // this value is applied as opacity-[value] when the component is disabled
				dividerWeight: '1px', // h-divider the default height applied to the divider component
				fontSize: {
					tiny: '0.75rem', // text-tiny
					small: '0.875rem', // text-small
					medium: '1rem', // text-medium
					large: '1.125rem', // text-large
				},
				lineHeight: {
					tiny: '1rem', // text-tiny
					small: '1.25rem', // text-small
					medium: '1.5rem', // text-medium
					large: '1.75rem', // text-large
				},
				radius: {
					small: '8px', // rounded-small
					medium: '12px', // rounded-medium
					large: '14px', // rounded-large
				},
				borderWidth: {
					small: '1px', // border-small
					medium: '2px', // border-medium (default)
					large: '3px', // border-large
				},
			},
			themes: {
				light: {
					layout: {
						boxShadow: {
							// shadow-small
							small: '0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
							// shadow-medium
							medium: '0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
							// shadow-large
							large: '0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
						},
					},
				},
				dark: {
					colors: {
						// tailwind slate theme
						// primary: '#0d1117',
						// secondary: '#161b22',
						// accent: '#f9826c',
						// selection: '#1f6feb',
						// gradient: 'linear-gradient(90deg, #1f6feb, #0d1117)',
					},
					layout: {
						boxShadow: {
							// shadow-small
							small: '0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
							// shadow-medium
							medium: '0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
							// shadow-large
							large: '0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
						},
					},
				},
			},
		}),
	],
};
