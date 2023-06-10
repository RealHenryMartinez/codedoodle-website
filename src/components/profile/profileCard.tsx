import { Link } from "react-router-dom";
import {ICardLabel, ICard } from "../../interfaces/IHome.js";
import "../../styles/home/PostCard.css";
import * as BiIcons from "react-icons/bi";
import { formatDate } from "../../helper/formatDate.js";
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
	card: ICard;
	user: string;
    remove: (_id: string) => void;
}

export const ProfileCard = (props: IProps) => {
	const { card, remove } = props;

	return (
		<div className={"card"}
        unselectable="on">
			{/* Create a new underlined style */}
			<div className="card-header">
				<h2 className="profile-header">{card.title}</h2>
				<BiIcons.BiTrashAlt
					className="delete-card"
					size={25}
					color="#fff"
					// Check if there is an id
                    onClick={() => remove(card?._id ?? '')}
				/>
			</div>
			<h5>{formatDate(card.createdAt)}</h5>
			<Link
				to={{ pathname: `/create/view-card/${card._id}` }}
				state={{ card }}
                className="link-group"
			>
				<img className={"card-image"} src={card.image || "https://www.shutterstock.com/image-photo/software-source-code-programming-on-260nw-634574354.jpg"} />
				<LabelComponent labels={card.labels} />
				<p>{card.description.substring(0, 35) + "..."}</p>
			</Link>
		</div>
	);
};
