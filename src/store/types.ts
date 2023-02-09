import type { BodyForGameState } from "../api";
import { PlayersStateType } from "./players/types";

export type StoreType = {
	stateGame: StateGameType;
	players: PlayersStateType;
};

export type StateGameType = Omit<BodyForGameState, "board">;
