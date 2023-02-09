import type {
	Board,
	GameState,
	PlayersPositionBodyEntityWithInfo,
} from "../../api/socket/types";

import type { ISocket } from "../../model/socket";
import { PlayersStateType } from "../../store/players/types";

export type PropsType = { socket: ISocket };

export type PropsForUiType = {
	gameState: GameState;
	board?: Board;
	ref: React.MutableRefObject<HTMLDivElement>;
	playersPosition: Array<PlayersPositionBodyEntityWithInfo>;
	playersInfo: PlayersStateType;
};

export type callbackFunc = (row: number, column: number, event: any) => void;
