import { ISocket } from "../../model/socket";
import SliderLogic from "./logic";
import SliderUi from "./ui";

import { PropsType } from "./types";

export default function Slider(props: PropsType) {
	return SliderLogic(SliderUi, props);
}
