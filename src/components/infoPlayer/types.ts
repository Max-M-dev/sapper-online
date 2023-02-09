export type PropsType = {
	id: number;
	name: string;
	color: string;
};
export type PropsForUiType = PropsType & {
	handlerHover: (id: number) => void;
	handlerHoverClear: () => void;
};
