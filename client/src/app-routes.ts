import { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';

export const routes: RouteDefinition[] = [
	{
		path: '/',
		component: lazy(() => import('@pages/Home.page')),
	},
	{
		path: '/*all',
		component: lazy(() => import('@pages/NotFound.page')),
	},
];
