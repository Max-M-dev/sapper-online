import type { CellType, PlayersChangerBodyEntity } from "../../api";

export type PropsType = Omit<CellType, "interacted_player_id"> & {
	interactedPlayerInfo: PlayersChangerBodyEntity | null | undefined;
};
