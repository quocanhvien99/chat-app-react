import React from 'react';
import { Redirect } from 'react-router';

export default function Home() {
	return (
		<div>
			<Redirect to="/app"></Redirect>
		</div>
	);
}
