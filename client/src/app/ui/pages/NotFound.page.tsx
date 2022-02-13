import { Component, JSX } from 'solid-js';

export interface NotFoundProps {}

const NotFound: Component<NotFoundProps> = (props: NotFoundProps): JSX.Element => {
	return (
		<div>
			<h3>Not Found Page</h3>
		</div>
	);
};

export default NotFound;
