import { defineConfig, UserConfigExport } from 'vite';
import solid from 'vite-plugin-solid';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import path from 'path';

const config = {
	plugins: [solid({ ssr: true }), typescriptPaths()],
	ssr: {
		noExternal: ['solid-meta'],
	},
	assetsInclude: [/\/static\/.*$/],
	build: {
		assetsInlineLimit: 0,
		target: 'esnext',
		polyfillDynamicImport: false,
	},
	resolve: {
		extensions: ['.ts', '.js', '.tsx', '.jsx'],
		alias: [
			{ find: '@src', replacement: path.resolve(__dirname, 'src') + '/' },
			{
				find: '@server',
				replacement: path.resolve(__dirname, 'src', 'server') + '/',
			},
			{
				find: '@client',
				replacement: path.resolve(__dirname, 'src', 'client') + '/',
			},
			{
				find: '@internals',
				replacement: path.resolve(__dirname, 'src', 'internals') + '/',
			},
			{
				find: '@app',
				replacement: path.resolve(__dirname, 'src', 'app') + '/',
			},
			{
				find: '@di',
				replacement: path.resolve(__dirname, 'src', 'app', 'di') + '/',
			},
			{
				find: '@router',
				replacement: path.resolve(__dirname, 'src', 'app', 'router') + '/',
			},
			{
				find: '@images',
				replacement: path.resolve(__dirname, 'src', 'app', 'assets', 'images') + '/',
			},
			{
				find: '@styles',
				replacement: path.resolve(__dirname, 'src', 'app', 'assets', 'styles') + '/',
			},
			{
				find: '@pages',
				replacement: path.resolve(__dirname, 'src', 'app', 'ui', 'pages') + '/',
			},
			{
				find: '@components',
				replacement: path.resolve(__dirname, 'src', 'app', 'ui', 'components') + '/',
			},
			{
				find: '@partials',
				replacement: path.resolve(__dirname, 'src', 'app', 'ui', 'partials') + '/',
			},
			{
				find: '@store',
				replacement: path.resolve(__dirname, 'src', 'app', 'store') + '/',
			},
			{
				find: '@utils',
				replacement: path.resolve(__dirname, 'src', 'app', 'utils') + '/',
			},
			{
				find: '@http',
				replacement: path.resolve(__dirname, 'src', 'app', 'http') + '/',
			},
			{
				find: '@dto',
				replacement: path.resolve(__dirname, 'src', 'app', 'http', 'dto') + '/',
			},
			{
				find: '@context',
				replacement: path.resolve(__dirname, 'src', 'app', 'context') + '/',
			},
		],
	},
} as UserConfigExport;

export default defineConfig(config);
