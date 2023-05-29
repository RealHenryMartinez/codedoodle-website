import "../styles/home/Home.css";
import { IDummy } from "../interfaces/IHome.js";
import { PostCard } from "../components/pageComponents/PostCard.js";

export const HomePage = () => {
	const dummyData: IDummy[] = [
		{
			title: "Website",
			description: "Creating a new website with React",
			labels: [
				{
					color: "#4b7ffa",
					name: "React",
				},
				{
					color: "#fa854b",
					name: "Firebase",
				},
				{
					color: "#4bfac8",
					name: "Beginner Friendly",
				},
			],
			image: "https://miro.medium.com/v2/resize:fit:0/1*y6C4nSvy2Woe0m7bWEn4BA.png",
		},
		{
			title: "Finished Project",
			description: "Tried react for the first time :)",
			labels: [
				{
					color: "#4b7ffa",
					name: "React",
				},
				{
					color: "#fa854b",
					name: "Firebase",
				},
				{
					color: "#4bfac8",
					name: "Beginner Friendly",
				},
			],
			image: "https://miro.medium.com/v2/resize:fit:0/1*y6C4nSvy2Woe0m7bWEn4BA.png",
		},
	];

	return (
		<>
			<div id="post-component">
				{dummyData.map((card, index) => (
					<PostCard key={index} card={card} />
				))}
			</div>
		
		</>
	);
};
