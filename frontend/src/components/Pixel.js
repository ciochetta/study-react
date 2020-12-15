import React, { useState } from "react";
import "../styles/pixel.scss";

export default function Pixel(props) {
	const { selectedColor } = props;

	const [pixelColor, setPixelColor] = useState("#fff");

	function applyColor(color) {
		setPixelColor(color);
	}

	function changeColorOnClick() {
		props.clicked({
			color: pixelColor,
			undo: applyColor,
		});

		applyColor(selectedColor);
	}

	return (
		<div
			className="pixel"
			onClick={changeColorOnClick}
			style={{ backgroundColor: pixelColor }}
		></div>
	);
}
