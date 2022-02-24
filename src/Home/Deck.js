import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Deck() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    getDecks();
  }, [setDecks]);

  const handleDelete = async (deckId) => {
    const result = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deckId);
      history.go(0);
    }
  };

  return (
    decks.length > 0 &&
    decks.map((deck, index) => {
      return (
        <div key={index} className="card my-5">
          <div className="card-body">
            <div className="row">
              <h5 className="card-title col float-left">{deck.name}</h5>
              <h6 className="mb-2 text-muted float-right">
                {deck.cards ? deck.cards.length : 0} cards
              </h6>
            </div>
            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deck.id}`}>
              <button className="btn btn-secondary mx-3">View</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button className="btn btn-primary">Study</button>
            </Link>
            <button
              className="btn btn-danger float-right"
              onClick={() => handleDelete(deck.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    })
  );
}

export default Deck;
