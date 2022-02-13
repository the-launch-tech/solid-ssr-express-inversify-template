import { renderToStringAsync } from 'solid-js/web';

import { AppWrapper, TagDescription } from '@src/AppWrapper';

export async function renderAppToString(tags: TagDescription[], url: string): Promise<string> {
	console.log('Render App To String!');
	return await renderToStringAsync(() => <AppWrapper url={url} tags={tags} />);
}
