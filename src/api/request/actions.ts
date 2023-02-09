import { DifficultyType } from "../socket/types";

import {
	RoomInfoRequestType,
	RoomCreateRequestSettingsResult,
	RoomCreateRequestType,
} from "./types";

export function roomInfo(nameRoom: string): RoomInfoRequestType {
	return {
		nameRoom,
	};
}

export function roomCreate(
	nameRoom: string,
	difficulty?: DifficultyType,
	settings?: RoomCreateRequestSettingsResult
): RoomCreateRequestType {
	if (difficulty === undefined && settings === undefined) {
		throw new Error(
			"One of the parameters must be specified. Difficulty or Settings game"
		);
	}
	return { nameRoom, difficulty, settings };
}
