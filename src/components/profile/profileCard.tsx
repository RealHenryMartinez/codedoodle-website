import { Link } from "react-router-dom";
import { IDummy, ICardLabel } from "../../interfaces/IHome.js";
import "../../styles/home/PostCard.css";
import {BiTrashAlt} from "react-icons/bi";
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
    remove: (_id: string) => {};
}

export const ProfileCard = (props: IProps) => {
	const { card, remove } = props;
   
	return (
		<div className={"card"}
        unselectable="on">
			{/* Create a new underlined style */}
			<div className="card-header">
				<h2 className="profile-header">{card.title}</h2>
				<BiTrashAlt
					className="delete-card"
					size={25}
					color="#fff"
                    onClick={() => remove(card._id!)}
				/>
			</div>
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
