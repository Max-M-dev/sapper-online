import { GameState } from "../../api";
import { ISocket } from "../../model/socket";

export type PropsType = {
	socket: ISocket;
	score: number;
	gameState: GameState;
};
