import { Component, JSX } from 'solid-js';

export interface HomeProps {}

const Home: Component<HomeProps> = (props: HomeProps): JSX.Element => {
	return (
		<div>
			<h3>Home Page</h3>
		</div>
	);
};

export default Home;
