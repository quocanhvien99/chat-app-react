import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './pages/routes';
import firebase from './services/firebase';
import './App.css';
import { setUser, removeUser } from './slices/user';
import { useDispatch } from 'react-redux';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				firebase.database().goOnline();
				var userStatusDatabaseRef = firebase
					.database()
					.ref('/status/' + user.uid);

				firebase
					.database()
					.ref('/status/' + user.uid)
					.onDisconnect()
					.set('offline')
					.then(function () {
						userStatusDatabaseRef.update({ set: 'online' });
					});

				firebase
					.firestore()
					.collection('users')
					.doc(user.uid)
					.onSnapshot((doc) => {
						const data = doc.data();
						dispatch(
							setUser({
								uid: data.uid,
								name: data.displayName,
								photoURL: data.photoURL,
								friends: data.friends,
							})
						);
					});
			} else {
				firebase.database().goOffline();
				dispatch(removeUser());
			}
		});
	}, []);

	return (
		<div className="App">
			<Router>
				<Switch>
					{routes.map((x) => (
						<Route exact={x.exact} path={x.path} key={x.path}>
							<x.component />
						</Route>
					))}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
