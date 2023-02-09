import { FC, useEffect, useState } from "react";
import { PropsForUiType, PropsType } from "./types";
export default function Logic(Ui: FC<PropsForUiType>, props: PropsType) {
	const [isShow, setIsShow] = useState(true);
	useEffect(() => {
		setIsShow(true);
		const showOff = () => setIsShow(false);
		const idTimer = setTimeout(showOff, 1000);
		return () => clearTimeout(idTimer);
	}, [props.positionY, props.positionX]);
	const propsForUi = { ...props, isShow };
	return Ui(propsForUi);
}
