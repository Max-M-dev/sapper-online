import { FC } from "react";
import type { PropsType, PropsForUiType } from "./types";
export default function Logic(Ui: FC<PropsForUiType>, props: PropsType) {
	const idStyleTemp = "tempCustomStyle";

	const handlerHover = (id: number) => {
		const style = document.createElement("style");
		style.id = idStyleTemp;
		style.innerHTML = `
		#cell:not([data-opened="${id}"]) {
			opacity: 0.1;
		}
		`;
		document.head.appendChild(style);
	};
	const handlerHoverClear = () => {
		document.getElementById(idStyleTemp)?.remove();
	};
	const propsForUi = { ...props, handlerHover, handlerHoverClear };
	return Ui(propsForUi);
}
