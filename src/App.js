import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './pages/routes';
import './App.css';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					{routes.map((x) => (
						<Route exact={x.exact} path={x.path}>
							<x.component />
						</Route>
					))}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
