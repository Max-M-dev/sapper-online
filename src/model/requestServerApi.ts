import { host } from "../api/config";
import request from "../controller/request";

import {
	RoomInfoRequestType,
	RoomCreateRequestType,
	RoomInfoResponse,
	RoomCreateResponse,
} from "../api";

export type RequestServerApiType = {
	getCreateRoom(payload: RoomCreateRequestType): Promise<RoomCreateResponse>;
	getRoomInfo(payload: RoomInfoRequestType): Promise<RoomInfoResponse>;
};

const requestServerApi: RequestServerApiType = {
	async getCreateRoom(payload: RoomCreateRequestType) {
		const response = await request(
			//@ts-ignore
			`${host.createroom}?${new URLSearchParams(payload).toString()}`
		);
		if (!response.ok) {
			throw new Error("Room Info response is not ok");
		}
		return await response.json();
	},
	async getRoomInfo(payload: RoomInfoRequestType) {
		const response = await request(
			`${host.roominfo}?${new URLSearchParams(payload).toString()}`
		);
		if (!response.ok) {
			throw new Error("Room Info response is not ok");
		}
		return await response.json();
	},
};
export default requestServerApi;
