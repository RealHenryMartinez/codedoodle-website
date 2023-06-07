import React from "react";
import { app } from "../constants/API.js";

export const useCard = () => {
	const [cards, setCards] = React.useState([]);
    const [gotData, setGotData] = React.useState(false);

	// get local storage cards
	const localCards = JSON.parse(localStorage.getItem("all-posts")!);
	const removeCard = async (_id: string) => {
		const { data } = await app.delete(`create/delete-card/` + _id);

		setCards(data);
	};

	const getData = async () => {
		try {
			// Checking if the user has already logged in and got the posts

			if (cards.length <= 0) {
				const { data } = await app.get(`create/get-cards`);
				console.log("got data here");

				localStorage.setItem("all-posts", JSON.stringify(data));

				//console.log(localCards);
				await setCards(localCards);
                await setGotData(true)
			}
		} catch (err) {
			throw err;
		}
	};
	// Public data
	React.useEffect(() => {
        if(!gotData){
            getData();
        }
		
		//console.log("got card data");
	}, [localStorage, gotData]);

	return {
		cards,
		removeCard,
	};
};
