import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	base: '/speech-test/',
	build: {
		outDir: 'docs',
	},
	plugins: [react()],
	server: {
		open: true
	}
})
