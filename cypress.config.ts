import { defineConfig } from 'cypress'

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
	env: {
		server: 'https://blog-api-3tmv.onrender.com',
	},
})
