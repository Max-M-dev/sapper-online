import Logic from "./logic";
import Ui from "./ui";
import { PropsType } from "./types";
export default function Cursor(props: PropsType) {
	return Logic(Ui, props);
}
