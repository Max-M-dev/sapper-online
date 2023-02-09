import { Row, Col, Typography, Switch } from "antd";

import Timer from "../timer";

import { PropsType } from "./types";

const { Text } = Typography;
export default function StatisticGame({ score, socket, gameState }: PropsType) {
	return (
		<>
			<Row>
				<Col>
					<Text style={{ fontSize: "20px" }}>Flag: {score}</Text>
				</Col>
			</Row>
			<Row>
				<Col>
					<Text style={{ fontSize: "20px" }}>
						Timer: <Timer socket={socket} gameState={gameState} />
					</Text>
				</Col>
			</Row>
		</>
	);
}
