import React from "react";
import { app } from "../constants/API.js";
import Cookies from "js-cookie";
/**
 * Custom hook for managing card data.
 * Retrieves card data from local storage and API, and provides functions for removing cards.
 * @returns {Object} An object containing the cards array and the removeCard function.
 */
export const useCard = () => {
  const [cards, setCards] = React.useState([]);
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
      const { data } = await app.get(`create/get-cards`);
      setCards(data);
      setGotData(true);
    }
  }, [cards.length]);

  // Fetch card data on component mount
  React.useEffect(() => {
    if (!gotData) {
      handleGetData();
    }
  }, [gotData, handleGetData]);

  return {
    cards,
    removeCard,
  };
};
