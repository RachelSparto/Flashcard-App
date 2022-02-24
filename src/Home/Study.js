import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import StudyCardsGood from "./StudyCardsGood";
import StudyCardsBad from "./StudyCardsBad";
import { readDeck } from "../utils/api";

function Study() {
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

  const studySwitch = () => {
    if (Object.keys(currentDeck).length > 0 && cards.length >= 3) {
      return <StudyCardsGood />;
    } else {
      return <StudyCardsBad />;
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <div>{studySwitch()}</div>
    </>
  );
}

export default Study;
