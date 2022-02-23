import React from "react";
import Deck from "./Deck";

function Decks() {
  // Existing decks are each shown with the deck name, the number of cards, and a Study, View, and Delete button.
  // Clicking the Study button brings the user to the Study screen.
  // Clicking the View button brings the user to the Deck screen.
  // Clicking the Delete button shows a warning message before deleting the deck.

  return (
    <>
      <Deck />
    </>
  );
}

export default Decks;
