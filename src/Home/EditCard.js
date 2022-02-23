import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const [deck, setDeck] = useState({});

  const { deckId, cardId } = useParams();

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [setDeck, deckId]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-gradient-dark">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2> {deck.name}: Edit Card</h2>
      <CardForm />
    </>
  );
}

export default EditCard;
