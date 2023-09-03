import "../styles/home/Home.css";
import { PostCard } from "../components/pageComponents/PostCard.js";
import { useCard } from "../hooks/useCard.js";
import { ICard } from "interfaces/ICard.js";

export const HomePage = () => {
	const {cards} = useCard();

	if (cards.length > 0) { 
		
		return (
			<>
				<div id="post-component">
					{cards.map((card: ICard, index: number) => (
						<PostCard key={index} card={card} user={card.username}/>
					))}
				</div>
			
			</>
		);
	
	}
	else if(cards.length === 0){
		return (
			<>
				<div id="post-component">
					<h1>No Posts available</h1>
				</div>
			</>
		)
	}
	else {
		return (
			<>
				<div id="post-component">
					<h1>Error getting cards</h1>
				</div>
			
			</>
		);
	}
	
};
