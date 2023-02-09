import { DifficultyType } from "../socket/types";

/* Request */

/* RoomInfo */
export type RoomInfoRequestType = {
	nameRoom: string;
};

/* RoomCreate */
export type RoomCreateRequestSettingsResult = {
	rows: number;
	columns: number;
	bombs: number;
};

export function RoomCreateRequestSettings(
	rows: number,
	columns: number,
	bombs: number
): RoomCreateRequestSettingsResult {
	return {
		rows,
		columns,
		bombs,
	};
}

export type RoomCreateRequestType = {
	nameRoom: string;
	difficulty?: DifficultyType;
	settings?: RoomCreateRequestSettingsResult;
};

/* Response */

/* RoomInfo */
export type RoomInfoResponse = {
	isExist: boolean;
	body: null | RoomInfoResponseBody;
};
export type RoomInfoResponseBody = {
	nameRoom: string;
	countUsers: number;
};

/* RoomCreate */
export type RoomCreateResponse = {
	success: boolean;
	message: string;
};
