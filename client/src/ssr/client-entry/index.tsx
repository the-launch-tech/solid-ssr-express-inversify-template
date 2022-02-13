import { JSX } from 'solid-js';
import { hydrate } from 'solid-js/web';

import { AppWrapper } from '@src/AppWrapper';

hydrate((): JSX.Element => {
	console.log('Hydrate App!');
	return <AppWrapper />;
}, document.getElementById('root') as HTMLElement);
