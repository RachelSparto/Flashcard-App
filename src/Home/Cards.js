import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";

function Cards({ cards }) {
  const history = useHistory();

  const handleDelete = async (cardId) => {
    const result = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (result) {
      await deleteCard(cardId);
      history.go(0);
    }
  };

  return cards.map((card, index) => {
    return (
      <div className="card" key={index}>
        <div className="card-body my-1">
          <div className="row">
            <p className="col card-text float-left">{card.front}</p>
            <p className="col card-text float-right">{card.back}</p>
          </div>
          <div className=" row float-right">
            <Link
              to={`/decks/${card.deckId}/cards/${card.id}/edit`}
              className="btn btn-secondary mx-3"
            >
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(card.id)}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    );
  });
}

export default Cards;
