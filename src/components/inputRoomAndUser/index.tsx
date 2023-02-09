import { useRef, useEffect } from "react";
import { Row, Col, Input } from "antd";

import type { InputRef } from "antd";

type PropsType = {
	names: { user: string; room: string };
	setNames: React.Dispatch<
		React.SetStateAction<{ user: string; room: string }>
	>;
	currentIsValid: boolean;
	setValidInput: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InputRoomAndUser({
	names,
	setNames,
	currentIsValid,
	setValidInput,
}: PropsType) {
	const refUser = useRef<InputRef | null>(null);
	const refRoom = useRef<InputRef | null>(null);

	/* useEffect => Fix error react */
	useEffect(() => {
		if (refUser.current && refRoom.current) {
			const isValidUserInput = refUser.current.input?.validity.valid;
			const isValidRoomInput = refRoom.current.input?.validity.valid;
			if (isValidRoomInput && isValidUserInput) {
				if (currentIsValid !== true) {
					setValidInput(() => true);
				}
			} else {
				if (currentIsValid !== false) {
					setValidInput(() => false);
				}
			}
		}
	});
	return (
		<Row gutter={25} wrap={false}>
			<Col flex="auto">
				<label htmlFor="userName">Enter user name</label>
				<Input
					id="userName"
					ref={refUser}
					minLength={3}
					required
					value={names.user}
					onChange={(event) => setNames({ ...names, user: event.target.value })}
				/>
			</Col>
			<Col flex="auto">
				<label htmlFor="roomName">Enter room name</label>
				<Input
					id="roomName"
					ref={refRoom}
					minLength={3}
					required
					value={names.room}
					onChange={(event) => setNames({ ...names, room: event.target.value })}
				/>
			</Col>
		</Row>
	);
}
