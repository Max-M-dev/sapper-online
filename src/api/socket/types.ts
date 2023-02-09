export type DifficultyType = "easy" | "medium" | "hard";

export type MessageType =
	| "tick"
	| "game_state"
	| "players_changed"
	| "player_positions";

export type GameState = "not_started" | "running" | "lose" | "win";

export interface BaseResponse {
	messageType: MessageType;
	body: BodyForGameState | PlayersChangerBody | PlayersPositionBody | TickBody;
}
export type BaseResponseG<T, U> = {
	messageType: T;
	body: U;
};
export interface BodyForGameState {
	board: Board;
	gameState: GameState;
	roomName: string;
	score: number;
	seconds: number;
	lastInteractedUserId: number;
	players: { playerId: number; openedCells: number; toggledFlags: number }[];
}

export type DefaultActionType<T extends object> = {
	action: string;
	body: T;
};

export type MousePositionBodyType = {
	x: number;
	y: number;
};
export type DefaultPositionCellType = {
	row: number;
	column: number;
};
export type StartCustomGameBodyType = {
	rows: number;
	columns: number;
	bombs: number;
};
export type MousePositionActionType = DefaultActionType<MousePositionBodyType>;
export type StartCustomGameActionType =
	DefaultActionType<StartCustomGameBodyType>;

/* TICK */
export type TickBody = { seconds: number };

/* PLAYERS */
export type PlayersChangerBody = {
	players: Array<PlayersChangerBodyEntity>;
};
export type PlayersChangerBodyEntity = {
	id: number;
	name: string;
	color: string;
};

/* BOARD */
export type Board = CellType[][];

export type CellType = {
	row: number;
	column: number;
	countOfBombs: null | number;
	isFlagged: boolean;
	isOpened: boolean;
	interacted_player_id: number | null;
};

/* player_positions */
export type PlayersPositionBody = {
	positions: Array<PlayersPositionBodyEntity>;
};
export type PlayersPositionBodyEntity = {
	x: number;
	y: number;
	playerId: number;
};
export type PlayersPositionBodyEntityWithInfo = PlayersPositionBodyEntity & {
	info: PlayersChangerBodyEntity;
};
