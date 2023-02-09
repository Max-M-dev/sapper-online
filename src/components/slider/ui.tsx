import { Layout, Row, Col, Typography, Button } from "antd";

import StatisticGame from "../statisticGame";
import ListPlayers from "../listPlayers";

import style from "./style.module.css";

import type { PropsForUiType } from "./types";

const { Content, Sider } = Layout;
const { Text } = Typography;

export default function SliderUi({
	score,
	gameState,
	onNewGame,
	goHome,
	socket,
}: PropsForUiType) {
	return (
		<Sider theme="light" className={style["content"]}>
			<Menu onNewGame={onNewGame} goHome={goHome} />
			<hr></hr>
			<StatisticGame score={score} socket={socket} gameState={gameState} />
			<hr></hr>
			<ListPlayers />
		</Sider>
	);
}

function Menu({
	onNewGame,
	goHome,
}: Pick<PropsForUiType, "onNewGame" | "goHome">) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 15,
			}}
		>
			<Button onClick={goHome} type="primary" ghost>
				Home
			</Button>
			<Button onClick={onNewGame} type="primary" ghost>
				Restart
			</Button>
		</div>
	);
}
