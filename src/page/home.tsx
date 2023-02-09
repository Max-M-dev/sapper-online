import React, { useState, useMemo } from "react";
import { Col, Row, Tabs } from "antd";
import CreateGame from "../components/createGame";
import CreateGameCustom from "../components/createGameCustom";
import GameEntry from "../components/gameEntry";
import InputRoomAndUser from "../components/inputRoomAndUser";

type ItemsTabsType = Array<{
	label: string;
	key: string;
	children: React.ReactNode;
}>;
type PropsType = {};

export default function Home(props: PropsType) {
	const [names, setNames] = useState({
		user: "",
		room: "",
	});
	const [isValidInput, setValidInput] = useState(false);
	const itemsTabs = useMemo<ItemsTabsType>(() => {
		return [
			{
				key: "0",
				label: `Create game`,
				children: <CreateGame {...names} disabledInput={!isValidInput} />,
			},
			{
				key: "1",
				label: `Create custom game`,
				disabled: true,
				children: <CreateGameCustom />,
			},
			{
				key: "2",
				label: `Game Entry`,
				children: <GameEntry {...names} disabledInput={!isValidInput} />,
			},
		];
	}, [isValidInput, names]);

	return (
		<>
			<Row
				align="middle"
				style={{
					height: "100vh",
					minWidth: "450px",
					width: "40vw",
					margin: "auto",
				}}
			>
				<Col>
					<InputRoomAndUser
						names={names}
						setNames={setNames}
						currentIsValid={isValidInput}
						setValidInput={setValidInput}
					/>
					<Row justify="center">
						<Col>
							<Tabs
								defaultActiveKey="0"
								tabPosition="top"
								animated
								style={{
									minHeight: "30vh",
								}}
								centered
								items={itemsTabs}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
}
