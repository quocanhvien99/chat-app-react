import { createSlice } from '@reduxjs/toolkit';

const initialState = { info: {}, isLogged: false };

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.info = action.payload;
			state.isLogged = true;
		},
		removeUser(state) {
			state.info = {};
			state.isLogged = false;
		},
	},
});

export const { setUser, removeUser } = user.actions;
export default user.reducer;
