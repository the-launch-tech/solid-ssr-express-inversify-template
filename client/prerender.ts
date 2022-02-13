import fs from 'fs';
import path from 'path';

const fromRoot = (p: string): string => path.resolve(__dirname, p);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const manifest = require('./dist/static/ssr-manifest.json');

const template = fs.readFileSync(fromRoot('dist/static/index.html'), 'utf-8');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { render } = require('./dist/ssr/server-entry/index.js');

const routesToPrerender = fs
	.readdirSync(fromRoot('src/pages'))
	.map((file) => {
		if (!file.includes('page.tsx')) {
			return undefined;
		}

		const name = file.replace(/\.page.tsx$/, '').toLowerCase();
		return name === 'home' ? `/` : `/${name}`;
	})
	.filter(Boolean);

(async () => {
	for (const url of routesToPrerender) {
		const [appHtml, preloadLinks] = await render(url, manifest);

		const html = template
			.replace(`<!--preload-links-->`, preloadLinks)
			.replace(`<!--app-html-->`, appHtml)
			.replace('__INITIAL__DATA__SOURCE__', JSON.stringify({}));

		const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
		fs.writeFileSync(fromRoot(filePath), html);
		console.log('pre-rendered:', filePath);
	}

	fs.unlinkSync(fromRoot('dist/static/ssr-manifest.json'));
})();
