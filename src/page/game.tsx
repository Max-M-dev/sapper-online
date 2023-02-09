import { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, message } from "antd";

import Board from "../components/board";
import Slider from "../components/slider";
import socketInit from "../socket";

import style from "./style.module.css";

import type { ISocket } from "../model/socket";

export default function Game() {
	const { roomName, userName } = useParams();
	if (roomName === undefined || userName === undefined) {
		message.error("Не указано имя комнаты или игрока");
		return <div></div>;
	}

	/* INIT SOCKET */
	const [socket, setSocket] = useState<ISocket>();
	useLayoutEffect(() => {
		const current = socketInit(userName, roomName);
		setSocket(() => {
			// console.log("set socket");
			return current;
		});
		
		return () => {
			current.close();
		};
	}, []);
	if (socket === undefined) {
		return <div></div>;
	}

	return (
		<Row className={style["container"]}>
			<Col className={style["board"]}>
				<Board socket={socket} />
			</Col>
			<Col className={style["siderbar"]}>
				<Slider socket={socket} />
			</Col>
		</Row>
	);
}
