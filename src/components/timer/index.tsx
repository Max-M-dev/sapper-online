import { useState, useEffect } from "react";

import type { BaseResponseG, BodyForGameState, TickBody } from "../../api";
import { ISocket } from "../../model/socket";

type TypeGameState = Pick<BodyForGameState, "gameState">;
type TypeProps = TypeGameState & { socket: ISocket };

export default function Timer({ gameState, socket }: TypeProps) {
	const [timer, setTimer] = useState(0);

	if (gameState !== "running" && timer !== 0) {
		setTimer(0);
	}
	useEffect(() => {
		const handleTick = (message: MessageEvent) => {
			const data: BaseResponseG<"tick", TickBody> = JSON.parse(message.data);
			if (data.messageType === "tick") {
				setTimer(data.body.seconds);
			}
		};
		socket.addEventListener("message", handleTick);
		return () => {
			socket.removeEventListener("message", handleTick);
		};
	}, []);
	const minutes = +(timer / 60).toFixed(0);
	const seconds = timer % 60;
	return <span>{`${minutes}:${seconds}`}</span>;
}
