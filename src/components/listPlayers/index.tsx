import { useSelector } from "react-redux";

import InfoPlayer from "../infoPlayer";
import style from "./style.module.css";

import { StoreType } from "../../store/types";

export default function ListPlayers() {
	const players = useSelector((state: StoreType) => state.players);
	// console.log(players);
	return (
		<div className={style["players"]}>
			{Object.values(players).map(({ id, name, color }) => {
				return <InfoPlayer key={id} id={id} name={name} color={color} />;
			})}
		</div>
	);
}
