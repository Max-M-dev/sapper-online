import React, { useMemo } from "react";
import { Row, Col } from "antd";

import Cell from "../cell";
import Cursor from "../cursor";

import style from "./style.module.css";

import type { PropsForUiType } from "./types";

export default function Ui({
	board,
	ref,
	gameState,
	playersPosition,
	playersInfo,
}: PropsForUiType): React.ReactElement {
	const cells = useMemo(() => {
		if (!Array.isArray(board)) {
			return "";
		}
		return board.map((row, indexRow) => {
			const columns = row.map((dataCell, indexColumn) => {
				const {
					row: rowIndexFromAPI,
					column: columnIndexFromAPI,
					isOpened,
					isFlagged,
					countOfBombs,
					interacted_player_id,
				} = dataCell;
				return (
					<Col key={indexColumn}>
						<Cell
							row={rowIndexFromAPI}
							column={columnIndexFromAPI}
							isOpened={isOpened}
							isFlagged={isFlagged}
							countOfBombs={countOfBombs}
							interactedPlayerInfo={
								interacted_player_id ? playersInfo[interacted_player_id] : null
							}
						/>
					</Col>
				);
			});
			return (
				<Row style={{ margin: "auto" }} wrap={false} key={indexRow}>
					{columns}
				</Row>
			);
		});
	}, [board, playersInfo]);
	const classForBoard = [style["board"]];
	switch (gameState) {
		case "lose":
			classForBoard.push(style["lose"]);
			break;
		case "win":
			classForBoard.push(style["win"]);
			break;
	}
	return (
		<div className={style["board-wrapper"]}>
			<div ref={ref} id="board" className={classForBoard.join(" ")}>
				{cells}
				{playersPosition.map((player) => {
					const { playerId, x, y, info } = player;
					return (
						<Cursor
							key={playerId}
							positionX={x}
							positionY={y}
							color={info.color}
							name={info.name}
						/>
					);
				})}
				{/* <Cursor color="tomato" name="Jon" /> */}
			</div>
		</div>
	);
}
