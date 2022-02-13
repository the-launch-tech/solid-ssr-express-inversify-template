import { Component, createSignal, JSX } from 'solid-js';
import { Title, Link } from 'solid-meta';
import { useRoutes } from 'solid-app-router';

import { routes } from '@src/app-routes';
import favicon from '@static/favicon.svg?url';

export interface AppProps {}

export const App: Component<AppProps> = (props: AppProps): JSX.Element => {
	const Routes: () => JSX.Element = useRoutes(routes);

	const [count, setCount] = createSignal(0);

	const counts = (Count: () => number): string => {
		const count = Count();
		return `${count} time${count === 1 ? '' : 's'}`;
	};

	return (
		<>
			<Title>Solid.js & Vite - SSR</Title>
			<Link rel='shortcut icon' type='image/svg+xml' href={favicon} />
			<div>
				<button onClick={() => setCount(count() + 1)}>Click me</button>
				<p> The Button Has been clicked {counts(count)}</p>
			</div>
			<Routes />
		</>
	);
};
