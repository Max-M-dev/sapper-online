import React from "react";
import { Input, Button, Typography, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";

import requestServerApi from "../../controller/requestServerApi";
import { roomInfoAction } from "../../api/index";
import style from "./style.module.css";

const { Text } = Typography;

type PropsType = {
	user: string;
	room: string;
	disabledInput: boolean;
};

export default function GameEntry({ user, room, disabledInput }: PropsType) {
	const navigate = useNavigate();
	const entry = async () => {
		const response = await requestServerApi.getRoomInfo(roomInfoAction(room));
		if (response.isExist) {
			message.success("Entry");
			navigate(`/game/${room}/${user}`);
			//Проверка, существует пользователь с таким именем
		} else {
			message.error("Room is not exist");
		}
	};
	return (
		<Row justify="center">
			<Col>
				<Button onClick={entry} disabled={disabledInput} ghost type="primary">
					Game entry
				</Button>
			</Col>
		</Row>
	);
}
