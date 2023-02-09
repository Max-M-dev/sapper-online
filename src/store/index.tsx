import { configureStore } from "@reduxjs/toolkit";

import stateGame from "./stateGame";
import players from "./players";

const store = configureStore({
	reducer: {
		stateGame,
		players,
	},
});
export default store;
