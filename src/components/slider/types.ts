import { GameState } from "../../api";
import { ISocket } from "../../model/socket";

export type PropsType = {
	socket: ISocket;
};

export type PropsForUiType = {
	score: number;
	gameState: GameState;
	onNewGame: () => void;
	goHome: () => void;
} & PropsType;
