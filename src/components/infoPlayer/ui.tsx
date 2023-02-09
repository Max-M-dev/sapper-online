import style from "./style.module.css";
import { PropsForUiType } from "./types";

export default function InfoPlayer({
	id,
	name,
	color,
	handlerHover,
	handlerHoverClear,
}: PropsForUiType) {
	return (
		<div
			className={style["player"]}
			onMouseOver={() => handlerHover(id)}
			onMouseOut={() => handlerHoverClear()}
		>
			<span
				className={style["circle"]}
				style={{ backgroundColor: color }}
			></span>
			{name}
		</div>
	);
}
