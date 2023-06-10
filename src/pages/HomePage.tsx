import "../styles/home/Home.css";
import { PostCard } from "../components/pageComponents/PostCard.js";
import { useCard } from "../hooks/useCard.js";

export const HomePage = () => {
	const {cards } = useCard();

	return (
		<>
			<div id="post-component">
				{cards.map((card: any, index) => (
					<PostCard key={index} card={card} user={card.user}/>
				))}
			</div>
		
		</>
	);
};
