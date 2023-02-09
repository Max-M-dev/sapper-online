import { Socket } from "./controller/socket";
import { urlSocket } from "./api/config";

export type InitSocketType = (userName: string, roomName: string) => Socket;

const initSocket: InitSocketType = function (
	userName: string,
	roomName: string
) {
	const socket = new Socket(
		`${urlSocket}?playerName=${userName}&roomName=${roomName}`
	);
	socket.onopen = function (data) {
		// console.log(`[openWS] - Открыто соединение. ${data}`);
	};
	socket.onerror = function (data) {
		// console.log(`[ErrorWS] - Ошибка на стороне WebSocket:`);
		// console.log(data);
	};

	socket.onmessage = function (message) {
		const data = JSON.parse(message.data);
		if (data.messageType !== "tick") {
			// console.log(data);
		}
	};

	socket.onclose = function (data) {
		// console.log(`[CloseWS] - Соединение закрыто: ${data}`);
	};
	return socket;
};

export default initSocket;
