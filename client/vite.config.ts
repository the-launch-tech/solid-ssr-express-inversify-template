import { defineConfig, UserConfigExport } from 'vite';
import solid from 'vite-plugin-solid';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import path from 'path';

const config = {
	plugins: [solid({ ssr: true }), typescriptPaths()],
	ssr: {
		noExternal: ['solid-meta'],
	},
	assetsInclude: ['src/static/assets/**/*'],
	build: {
		assetsInlineLimit: 0,
		target: 'esnext',
		polyfillDynamicImport: false,
	},
	resolve: {
		extensions: ['.ts', '.js', '.tsx', '.jsx'],
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, '/') },

			{ find: '@src', replacement: path.resolve(__dirname, 'src/') },

			{ find: '@ssr', replacement: path.resolve(__dirname, 'src/ssr/') },
			{ find: '@server-entry', replacement: path.resolve(__dirname, 'src/ssr/server-entry/') },
			{ find: '@client-entry', replacement: path.resolve(__dirname, 'src/ssr/client-entry/') },

			{ find: '@app', replacement: path.resolve(__dirname, 'src/app/') },
			{ find: '@ui', replacement: path.resolve(__dirname, 'src/app/ui/') },
			{ find: '@pages', replacement: path.resolve(__dirname, 'src/app/ui/pages/') },
			{ find: '@components', replacement: path.resolve(__dirname, 'src/app/ui/components/') },
			{ find: '@assets', replacement: path.resolve(__dirname, 'src/app/assets/') },
			{ find: '@static', replacement: path.resolve(__dirname, 'src/app/assets/static/') },
			{ find: '@styles', replacement: path.resolve(__dirname, 'src/app/assets/styles/') },
		],
	},
} as UserConfigExport;

export default defineConfig(config);
