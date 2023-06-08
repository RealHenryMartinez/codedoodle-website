import { Link } from "react-router-dom";
import { IDummy, ICardLabel } from "../../interfaces/IHome.js";
import "../../styles/home/PostCard.css";

const LabelComponent = (props: ICardLabel) => {
	const { labels } = props;
	return (
		<div id={"label-container"}>
			{labels.map((label, index) => (
				<div
					key={index}
					className={"label"}
					style={{ backgroundColor: label.color }}
				>
					<p className={"label-name"}>{label.name}</p>
				</div>
			))}
		</div>
	);
};

interface IProps {
	card: IDummy;
	user: string;
}

export const PostCard = (props: IProps) => {
	const { card, user } = props;
	return (
		<Link
			to={{ pathname: `/create/view-card/${card._id}` }}
			state={{ card }}
			className={"card"}
		>
			{/* Create a new underlined style */}
			<h2>{card.title}</h2>
			<h4>By: {user}</h4>
			<img className={"card-image"} src={card.image || "https://www.shutterstock.com/image-photo/software-source-code-programming-on-260nw-634574354.jpg"} />
			<LabelComponent labels={card.labels} />
			<p>{card.description.substring(0, 35) + "..."}</p>
		</Link>
	);
};
