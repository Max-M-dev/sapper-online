import React, { FC } from "react";
import Logic from "./logic";
import Ui from "./ui";

import { PropsType } from "./types";

export default function (props: PropsType) {
	return Logic(Ui, props);
}
