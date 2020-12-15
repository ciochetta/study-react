import React from "react";
import "../styles/row.scss";
import Pixel from "./Pixel";

export default function Row(props) {
	const { width, selectedColor } = props;

	const pixelClicked = (dataFromChild) => {
		props.clicked(dataFromChild);
	};

	let pixels = [];

	for (let i = 0; i < width; i++) {
		pixels.push(
			<Pixel key={i} clicked={pixelClicked} selectedColor={selectedColor} />
		);
	}

	return <div className="row">{pixels}</div>;
}
