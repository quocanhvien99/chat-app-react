import Chat from './Chat/Chat';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';

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
	{
		path: '/register',
		component: Register,
	},
	{
		path: '/forget-password',
		component: ForgetPassword,
	},
	{
		path: '/app/:id',
		component: Chat,
	},
	{
		path: '/app',
		component: Chat,
	},
];

export default routes;
