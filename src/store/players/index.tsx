import { createSlice } from "@reduxjs/toolkit";
import { PlayersStateType } from "./types";

const initialState: PlayersStateType = {};

const store = createSlice({
	name: "players",
	initialState,
	reducers: {
		set(state, { payload }) {
			return payload;
		},
	},
});

export const { set } = store.actions;
export default store.reducer;
