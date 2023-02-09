import React, { useEffect, useRef, FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { initialState, setStateGame } from "../../store/stateGame";
import { set as setPlayers } from "../../store/players";
import {
	Board,
	MOUSE_POSITION,
	OPEN_CELL,
	PlayersPositionBodyEntityWithInfo,
	SET_FLAG,
} from "../../api";

import type { PropsForUiType, PropsType, callbackFunc } from "./types";
import type { StateGameType, StoreType } from "../../store/types";
import type {
	BodyForGameState,
	BaseResponse,
	PlayersChangerBody,
	PlayersPositionBody,
} from "../../api";
import type { PlayersStateType } from "../../store/players/types";

export default function Logic(Ui: FC<PropsForUiType>, { socket }: PropsType) {
	const dispatch = useDispatch();
	const [listsCells, setListsCells] = useState<Board>([]);
	const stateGame: StateGameType = useSelector(
		(store: StoreType) => store.stateGame
	);
	const { gameState } = stateGame;

	/* PLAYERS */
	const storePlayersList: PlayersStateType = useSelector(
		(store: StoreType) => store.players
	);
	const [playersPosition, setPlayersPosition] = useState<
		Array<PlayersPositionBodyEntityWithInfo>
	>([]);

	/* Handler mesage socket */
	useEffect(() => {
		const handlerMessage = (message: MessageEvent) => {
			const data: BaseResponse = JSON.parse(message.data);
			switch (data["messageType"]) {
				case "game_state":
					const body = data["body"] as BodyForGameState;
					const { board, ...stateGame } = body;
					dispatch(setStateGame(stateGame));
					setListsCells(board);
					// console.log("gameState", gameState);
					// console.log("body", body);
					break;

				case "players_changed":
					const bodyPlayers = data["body"] as PlayersChangerBody;
					const objPlayers: PlayersStateType = {};
					bodyPlayers.players.forEach((player) => {
						objPlayers[player.id] = player;
					});
					dispatch(setPlayers(objPlayers));
					break;
				case "player_positions":
					const bodyPlayersPosition = data["body"] as PlayersPositionBody;
					const playersPosition = bodyPlayersPosition.positions.map(
						(player) => {
							//@ts-ignore
							player.info = storePlayersList[player.playerId];
							return player;
						}
					) as never as PlayersPositionBodyEntityWithInfo[];
					setPlayersPosition(playersPosition);
					break;
			}
		};
		socket.addEventListener("message", handlerMessage);
		return () => socket.removeEventListener("message", handlerMessage);
	}, [storePlayersList]);

	const refBoard = useRef() as React.MutableRefObject<HTMLDivElement>;
	/* EVENT MOUSE Click & ContextMenu */
	useEffect(() => {
		const refCurrent = refBoard.current; //fix: notFoundContext
		if (refCurrent === undefined) {
			return;
		}
		const handleBaseValidation = (fn: callbackFunc) => {
			return (event: MouseEvent) => {
				const target = event.target as HTMLDivElement;
				if (!("id" in target)) {
					return;
				}
				if (target.id !== "cell") {
					return;
				}
				if (!("dataset" in target)) {
					console.log("Not found dataset");
					return;
				}
				const row = target.dataset.row;
				const column = target.dataset.column;
				if (row !== undefined && column !== undefined) {
					fn(+row, +column, event);
				}
			};
		};
		// CLICK
		const handleClick: callbackFunc = (row, column, event) => {
			event.preventDefault();
			socket.send(JSON.stringify(OPEN_CELL(row, column)));
		};
		const handleClickWithValidation = handleBaseValidation(handleClick);
		refCurrent.addEventListener("click", handleClickWithValidation);

		// CONTEXTMENU
		const handleContextMenu: callbackFunc = (row, column, event) => {
			event.preventDefault();
			socket.send(JSON.stringify(SET_FLAG(row, column)));
		};
		const handleContextMenuWithValidation =
			handleBaseValidation(handleContextMenu);
		refCurrent.addEventListener("contextmenu", handleContextMenuWithValidation);

		return () => {
			refCurrent.removeEventListener("click", handleClickWithValidation);
			refCurrent.removeEventListener(
				"contextmenu",
				handleContextMenuWithValidation
			);
		};
	}, [refBoard]);

	/* CURSOR MOVE EVENT */
	useEffect(() => {
		const refBoardCurrent = refBoard.current;
		const handlerMouseMove: React.MouseEventHandler<HTMLDivElement> = (
			event
		) => {
			const rect = refBoard.current.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			// console.log(x, y);
			const percentX = +((x / rect.width) * 100).toFixed();
			const percentY = +((y / rect.height) * 100).toFixed();
			socket.send(JSON.stringify(MOUSE_POSITION(percentX, percentY)));
		};
		//@ts-ignore
		refBoardCurrent.addEventListener("mousemove", handlerMouseMove);
		return () =>
			//@ts-ignore
			refBoardCurrent.removeEventListener("mousemove", handlerMouseMove);
	}, []);

	/* UNMOUNT => CLEAR STATE GAME */
	useEffect(
		() => () => {
			dispatch(setStateGame(initialState));
		},
		[]
	);

	const propsForUi: PropsForUiType = {
		gameState,
		ref: refBoard,
		board: listsCells,
		playersPosition,
		playersInfo: storePlayersList,
	};

	return Ui(propsForUi);
}
