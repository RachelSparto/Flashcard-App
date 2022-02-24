import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyCardsBad() {
  const [currentDeck, setCurrentDeck] = useState({});
  const { deckId } = useParams();
  const { name, cards } = currentDeck;

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setCurrentDeck(response);
    }
    if (deckId) {
      getDeck();
    }
  }, [deckId]);

  return (
    Object.keys(currentDeck).length > 0 && (
      <>
        <h1>{name}: Study </h1>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} in this
          deck.
        </p>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary my-3 px-2 py-2"
        >
          + Add Cards
        </Link>
      </>
    )
  );
}

export default StudyCardsBad;
