import { Component, JSX } from 'solid-js';
import { Router } from 'solid-app-router';
import { MetaProvider } from 'solid-meta';

import { App } from '@src/App';

import '@styles/_main.scss';

export interface TagDescription {
	tag: string;
	props: Record<string, unknown>;
}

export interface AppWrapperProps {
	url?: string;
	tags?: TagDescription[];
}

export const AppWrapper: Component<AppWrapperProps> = (props: AppWrapperProps): JSX.Element => {
	return (
		<MetaProvider tags={props.tags ?? []}>
			<Router url={props.url}>
				<App />
			</Router>
		</MetaProvider>
	);
};
