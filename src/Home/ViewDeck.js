import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import Cards from "./Cards";

function ViewDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const { name, description, cards } = deck;

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
          <li className="breadcrumb-item ">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
      <h3>{name}</h3>
      <p>{description}</p>
      <Link
        to={`/decks/${deckId}/edit`}
        className="btn btn-secondary mx-2 text-white"
      >
        Edit
      </Link>
      <Link
        to={`/decks/${deckId}/study`}
        className="btn btn-primary mx-2 text-white"
      >
        Study
      </Link>
      <Link
        to={`/decks/${deckId}/cards/new`}
        className="btn btn-primary text-white"
      >
        + Add Cards
      </Link>
      <button className="btn btn-danger float-right">Delete</button>

      <h1 className="my-5">Cards</h1>
      {cards && <Cards cards={cards} />}
    </>
  );
}

export default ViewDeck;
