export type PropsType = {
	color: string;
	name: string;
	positionX: number;
	positionY: number;
};

export type PropsForUiType = PropsType & {
	isShow: boolean;
};
