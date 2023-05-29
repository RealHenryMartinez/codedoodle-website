import React from "react";
import { Link } from "react-router-dom";
import { IDummy, ICardLabel} from "../../interfaces/IHome.js";
import '../../styles/home/PostCard.css'

const LabelComponent = (props: ICardLabel) => {
	const {labels} = props;
	return (
		<div id={"label-container"}>
			{labels.map((label, index) => 
				<div key={index} className={"label"} style={{backgroundColor: label.color}}>
					<p className={"label-name"}>{label.name}</p>
				</div>
			)}
		</div>
	)
}

interface IProps {
    card: IDummy;
}

export const PostCard = (props: IProps) => {
    const {card} = props;
	return (
		<Link to={`/card/${card._id}`} className={"card"}>
			{/* Create a new underlined style */}
			<h1>{card.title}</h1>
			<img className={"card-image"} src={card.image} />
			<LabelComponent labels={card.labels} />
			<p>{card.description.substring(0,35) + "..."}</p>
		</Link>
	);
};
