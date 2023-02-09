import {
	DifficultyType,
	StartCustomGameActionType,
	DefaultActionType,
	DefaultPositionCellType,
	MousePositionActionType,
} from "./types";

export const START_GAME = (difficulty: DifficultyType) => ({
	action: "startGame",
	body: {
		difficulty: difficulty,
	},
});
export const START_CUSTOM_GAME = (
	rows: number,
	columns: number,
	bombs: number
): StartCustomGameActionType => ({
	action: "startCustomGame",
	body: { rows, columns, bombs },
});

export const SET_FLAG = (
	row: number,
	column: number
): DefaultActionType<DefaultPositionCellType> => ({
	action: "setFlag",
	body: {
		row,
		column,
	},
});

export const OPEN_CELL = (
	row: number,
	column: number
): DefaultActionType<DefaultPositionCellType> => ({
	action: "openCell",
	body: {
		row,
		column,
	},
});

export const MOUSE_POSITION = (
	x: number,
	y: number
): MousePositionActionType => ({
	action: "mousePosition",
	body: {
		x,
		y,
	},
});

export const RESTART = (): { action: string; body: string } => ({
	action: "restart",
	body: "restart",
});
