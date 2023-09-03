import React from "react";
import { app } from "../constants/API.js";
import Cookies from "js-cookie";
import { ICard } from "interfaces/ICard.js";

interface ICardHandler {
  cards: ICard[],
  removeCard: (_id: string) => Promise<void>
}
/**
 * Custom hook for managing card data.
 * Retrieves card data from local storage and API, and provides functions for removing cards.
 * @returns {Object} An object containing the cards array and the removeCard function.
 */
export const useCard = (): ICardHandler => {
  const [cards, setCards] = React.useState<ICard[]>([]);
  const [gotData, setGotData] = React.useState(false);

  /**
   * Removes a card by sending a delete request to the API.
   * @param {string} _id - The ID of the card to be removed.
   */
  const removeCard = async (_id: string) => {
    const { data } = await app.delete(`create/delete-card/` + _id, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`, // Include the token in the request headers
      },
    });
    setCards(data);
  };
  /**
   * Callback function to handle retrieving card data.
   * Fetches card data from the API if it hasn't been retrieved yet.
   */
  const handleGetData = React.useCallback(async () => {
    if (cards.length <= 0) {
      try {
        const { data } = await app.get(`create/get-cards`);
        console.log('here are cards: ', data)
        setCards(data);
        setGotData(true);
      } catch (error) {
        console.error("Error retrieving card data:", error);
        // Handle the error state or display an error message
      }
    }
  }, [cards.length]);

  // Fetch card data on component mount
  React.useEffect(() => {

      handleGetData();
    
  }, [handleGetData]);

  return {
    cards,
    removeCard,
  };
};
