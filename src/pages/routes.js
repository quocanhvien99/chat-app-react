import Home from './Home/Home';
import Login from './Login/Login';

const routes = [
	{
		path: '/',
		component: Home,
		exact: true,
	},
	{
		path: '/login',
		component: Login,
	},
];

export default routes;
