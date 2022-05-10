import { createSlice } from '@reduxjs/toolkit';

export interface loadingState {
	value: boolean;
}

const initialState: loadingState = {
	value: false,
};

export const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		startLoad: (state) => {
			state.value = true;
		},
		finishLoad: () => {
			return initialState;
		},
	},
});

export const { startLoad, finishLoad } = loadingSlice.actions;

export default loadingSlice.reducer;
