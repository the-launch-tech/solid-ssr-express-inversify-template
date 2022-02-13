import { ViteDevServer } from 'vite';
import { readFileSync } from 'fs';
import path from 'path';
import express from 'express';
import 'localstorage-polyfill';

import { SSRRenderObject } from './src/ssr/server-entry/index';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const PORT = process.env.PORT || '3000';

async function createServer(
	root = process.cwd(),
	isProd = process.env.NODE_ENV === 'production'
): Promise<{ app: express.Application; vite: ViteDevServer }> {
	const resolve = (p: string): string => path.resolve(__dirname, p);

	const indexProd = isProd ? readFileSync(resolve('dist/client/index.html'), 'utf-8') : '';

	/* eslint-disable-next-line */
	const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {};

	const app = express().disable('x-powered-by');

	let vite!: ViteDevServer;

	if (!isProd) {
		/* eslint-disable-next-line @typescript-eslint/no-var-requires */
		vite = await require('vite').createServer({
			root,
			logLevel: isTest ? 'error' : 'info',
			server: {
				middlewareMode: true,
			},
		});
		app.use(vite.middlewares);
	} else {
		/* eslint-disable-next-line @typescript-eslint/no-var-requires */
		app.use(require('compression'));
		app.use(
			/* eslint-disable-next-line @typescript-eslint/no-var-requires */
			require('serve-static')(resolve('dist/client'), {
				index: false,
			})
		);
	}

	/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
	app.use('*', async (req: express.Request, res: express.Response): Promise<void> => {
		try {
			const url = req.originalUrl;

			const template = isProd
				? indexProd
				: await vite.transformIndexHtml(url, readFileSync(resolve('index.html'), 'utf-8'));

			const render = isProd
				? /* eslint-disable-next-line @typescript-eslint/no-var-requires */
				  require('./dist/ssr/server-entry/index.js').render
				: (await vite.ssrLoadModule('/src/ssr/server-entry/index.ts')).render;

			const html: SSRRenderObject = await render(url);

			const appHtml = template
				.replace(`<!--app-head-->`, html.head + html.hydration)
				.replace(`<!--app-html-->`, html.body)
				.replace('__INITIAL__DATA__SOURCE__', JSON.stringify({}));

			res.status(200).set({ 'Content-Type': 'text/html' }).end(appHtml);
		} catch (e) {
			if (!isProd) {
				vite.ssrFixStacktrace(e as Error);
			}
			console.log((e as Error).stack);
			if (!isProd) {
				res.status(500).end((e as Error).stack);
			}
		}
	});

	return { app, vite };
}

if (!isTest) {
	createServer()
		.then(({ app }) =>
			app.listen(PORT, () => {
				console.log(`http://localhost:${PORT}`);
			})
		)
		.catch((err) => {
			console.error('Error Starting Server:\n', err);
			process.exit(1);
		});
}

export default createServer;
