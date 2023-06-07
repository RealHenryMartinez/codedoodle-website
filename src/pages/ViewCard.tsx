import React from "react";
import { useLocation } from "react-router-dom";
import { Markdown } from "../components/form/markdown.js";
import "../styles/home/card.css";

const ViewCard = () => {
	const { state } = useLocation();
    const helperState = state.card

    // note: need to change this so it receives a request so it could be shared with other people
	return (
		<>
			<div>
				<img id="card-image" src={helperState.image} />
                <h1 id="title">{helperState.title[0].toUpperCase() + helperState.title.substring(1, helperState.title.length)}</h1>
				<h3 id="user">By: {helperState.user}</h3>
				<Markdown markdownText={helperState.description} />
			</div>
		</>
	);
};

export default ViewCard;
