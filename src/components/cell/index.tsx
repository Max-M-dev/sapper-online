import style from "./style.module.css";

import type { PropsType } from "./types";

export default function Cell(props: PropsType) {
	const {
		row,
		column,
		isOpened,
		isFlagged,
		countOfBombs,
		interactedPlayerInfo,
	} = props;
	const classCell = [style.cell];
	isOpened && classCell.push(style.open);
	isFlagged && classCell.push(style.flag);
	countOfBombs === 9 && classCell.push(style.bomb);
	let styleBorderColor = "grey";
	if (
		interactedPlayerInfo !== null &&
		typeof interactedPlayerInfo === "object"
	) {
		// console.log("interactedPlayerInfo=>", interactedPlayerInfo);
		// console.log(interactedPlayerInfo);
		styleBorderColor = interactedPlayerInfo.color;
	}
	return (
		<div
			id="cell"
			className={classCell.join(" ")}
			data-row={row}
			data-column={column}
			data-opened={interactedPlayerInfo?.id}
			style={{ borderColor: styleBorderColor }}
		>
			{countOfBombs && countOfBombs !== 9 ? countOfBombs : ""}
		</div>
	);
}
