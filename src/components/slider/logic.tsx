import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RESTART } from "../../api";

import { PropsType, PropsForUiType } from "./types";
import { StoreType } from "../../store/types";

export default function SliderLogic(
	Ui: FC<PropsForUiType>,
	{ socket }: PropsType
) {
	/* STORE */
	const score = useSelector(({ stateGame }: StoreType) => stateGame.score);
	const gameState = useSelector(
		({ stateGame }: StoreType) => stateGame.gameState
	);

	/* NAVIGATE */
	const navigate = useNavigate();
	const goHome = () => {
		navigate("/");
	};
	const onNewGame = () => {
		socket.send(JSON.stringify(RESTART()));
	};

	const propsForUi: PropsForUiType = {
		socket,
		score,
		gameState,
		onNewGame,
		goHome,
	};
	return Ui(propsForUi);
}
