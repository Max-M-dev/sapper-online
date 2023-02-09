import { createSlice } from "@reduxjs/toolkit";

import type { StateGameType } from "./types";

export const initialState: StateGameType = {
	gameState: "not_started",
	roomName: "anonymous",
	score: 0,
	seconds: 0,
	lastInteractedUserId: 0,
	players: [],
};

export const store = createSlice({
	name: "stateGame",
	initialState,
	reducers: {
		setStateGame(state, action) {
			return action.payload;
		},
	},
});
export const { setStateGame } = store.actions;
export default store.reducer;
