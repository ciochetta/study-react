import React, { useRef, useState, useEffect, useCallback } from "react";
import "../styles/drawingPanel.scss";
import Row from "./Row";

export default function DrawingPanel(props) {
	const { width, height, selectedColor } = props;

	const [actions, setActions] = useState([]);

	const panelRef = useRef();

	let rows = [];

	const undo = useCallback(() => {
		if (actions.length === 0) {
			return;
		}

		const myAction = actions[actions.length - 1];

		myAction.undo(myAction.color);

		let newActions = [...actions];

		newActions.splice(newActions.length - 1, 1);

		setActions(newActions);
	}, [actions, setActions]);

	useEffect(() => {
		function handleControlZ(event) {
			if (event.keyCode === 26) {
				undo();
			}
		}
		window.addEventListener("keypress", handleControlZ);

		return () => {
			window.removeEventListener("keypress", handleControlZ);
		};
	}, [undo]);

	const pixelClicked = function (actionInfo) {
		setActions([...actions, actionInfo]);
	};

	for (let i = 0; i < height; i++) {
		rows.push(
			<Row
				key={i}
				width={width}
				selectedColor={selectedColor}
				clicked={pixelClicked}
			/>
		);
	}

	return (
		<div id="drawingPanel">
			<div id="pixels" ref={panelRef}>
				{rows}
			</div>
			<button onClick={undo} className="button">
				Undo (control + Z)
			</button>
		</div>
	);
}
