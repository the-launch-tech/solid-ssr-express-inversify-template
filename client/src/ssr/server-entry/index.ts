import { generateHydrationScript } from 'solid-js/web';
import { renderTags } from 'solid-meta';

import { TagDescription } from '@src/AppWrapper';
import { renderAppToString } from '@src/ssr/server-entry/entry';

export interface SSRRenderObject {
	head: string;
	hydration: string;
	body: string;
}

export async function render(url: string): Promise<SSRRenderObject> {
	console.log('Render SSR!');
	const tags: TagDescription[] = [];
	const body: string = await renderAppToString(tags, url);
	const hydration: string = generateHydrationScript();
	const head: string = renderTags(tags);

	return {
		head,
		hydration,
		body,
	};
}
