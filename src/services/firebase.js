import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
	apiKey: 'AIzaSyDTVxua8DfqsB8tGKJpQkbziiPV2ZibacA',
	authDomain: 'chat-app-5ec6f.firebaseapp.com',
	projectId: 'chat-app-5ec6f',
	storageBucket: 'chat-app-5ec6f.appspot.com',
	messagingSenderId: '667442542370',
	appId: '1:667442542370:web:d3a34864450bb8d0d0977b',
	measurementId: 'G-0M6X2S8YGH',
});

export default app;
