import style from "./style.module.css";

import type { PropsForUiType } from "./types";

export default function Ui({
	color,
	name,
	positionX,
	positionY,
	isShow,
}: PropsForUiType) {
	const styleInline = {
		background: color,
		top: `${positionY}%`,
		left: `${positionX}%`,
		opacity: isShow ? "1" : "0",
	};
	return (
		<span
			className={style["cursor"]}
			data-name={name}
			style={styleInline}
		></span>
	);
}
