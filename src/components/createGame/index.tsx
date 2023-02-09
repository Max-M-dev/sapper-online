import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, message } from "antd";
import requestServerApi from "../../controller/requestServerApi";
import { roomInfoAction, roomCreateAction } from "../../api";

import style from "./style.module.css";
import { DifficultyType } from "../../api/socket/types";

export default function CreateGame({
	user,
	room,
	disabledInput,
}: {
	user: string;
	room: string;
	disabledInput: boolean;
}) {
	const navigate = useNavigate();
	async function createRoom(difficulty: DifficultyType) {
		const responseRoomInfo = await requestServerApi.getRoomInfo(
			roomInfoAction(room)
		);
		if (responseRoomInfo.isExist === true) {
			message.error(`"${room}" room exists`);
			return;
		}
		const responseCreateRoom = await requestServerApi.getCreateRoom(
			roomCreateAction(room, difficulty)
		);
		if (responseCreateRoom.success === true) {
			message.success("Entry");
			navigate(`/game/${room}/${user}`);
		} else {
			message.error(responseCreateRoom.message);
		}
	}

	return (
		<Row className={style["indent"]} justify="space-around">
			<Col>
				<Button
					onClick={() => createRoom("easy")}
					disabled={disabledInput}
					type="primary"
					ghost
				>
					Easy
				</Button>
			</Col>
			<Col>
				<Button
					onClick={() => createRoom("medium")}
					type="primary"
					disabled={disabledInput}
					ghost
				>
					Medium
				</Button>
			</Col>
			<Col>
				<Button
					onClick={() => createRoom("hard")}
					type="primary"
					disabled={disabledInput}
					ghost
				>
					Hard
				</Button>
			</Col>
		</Row>
	);
}
