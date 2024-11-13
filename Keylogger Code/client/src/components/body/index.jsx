import React, { useEffect, useState } from "react";
import "./body.scss";
import { data, getFilteredKeys, shuffle, specialKeys } from "../../utils";
import { KeyBtn } from "../ui/button";
import { usePreference } from "../../context/Preference";
import { Terminal } from "lucide-react";
import { WS_URL } from "../../utils/constant";
import { useStroke } from "../../context/Strokes";

const IconConfig = {
	size: 28,
	strokeWidth: 1.3,
};

export default function Body() {
	const { preferences, updateIndicator } = usePreference();
	const { indicator } = preferences;
	const { state, dispatch } = useStroke();

	useEffect(() => {
		// initalize socket connection
		console.log(state);
		socketConn();
	}, []);

	const socketConn = async () => {
		// Create a new WebSocket connection
		const newSocket = new WebSocket(WS_URL);

		// listen to incomming strokes
		newSocket.onmessage = (event) => {
			// console.log("WebSocket message received:", event.data);
			let resp = JSON.parse(event.data);
			// push new stroke
			// console.log(resp.stroke);
			dispatch({ type: "ADD_STROKE", payload: resp.stroke });
			console.log(state);
		};
	};

	return (
		<div className="body">
			{state?.length >= 1 ? (
				state?.map((item, index) => (
					<KeyBtn
						key={index}
						value={item}
						special={specialKeys.includes(item)}
						indicate={getFilteredKeys(indicator).includes(item)}
					/>
				))
			) : (
				<NoKeys />
			)}
		</div>
	);
}

const NoKeys = () => {
	return (
		<div className="no-keys">
			<Terminal {...IconConfig} />
			<span>No Keys found</span>
		</div>
	);
};
