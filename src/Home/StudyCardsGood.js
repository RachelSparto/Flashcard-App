import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyCardsGood() {
  const [currentDeck, setCurrentDeck] = useState({});
  const { name, cards } = currentDeck;
  const [cardFlip, setCardFlip] = useState(false);
  const [shownCard, setShownCard] = useState(0);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setCurrentDeck(response);
    }
    if (deckId) {
      getDeck();
    }
  }, [deckId]);

  const handleCardFlip = () => {
    setCardFlip(!cardFlip);
  };

  const handleNextCard = () => {
    setShownCard((current) => current + 1);
    setCardFlip(false);
    if (shownCard + 1 === cards.length) {
      const result = window.confirm("Restart cards?");
      if (result) {
        history.go(0);
      } else {
        history.push("/");
      }
    }
  };

  return (
    Object.keys(currentDeck).length > 0 && (
      <>
        <h1>Studying: {name}</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {shownCard + 1} of {cards.length}
            </h5>
            <p className="card-text">
              {!cardFlip
                ? `Front: ${cards[shownCard].front}`
                : `Back: ${cards[shownCard].back}`}
            </p>
            <button
              type="button"
              className="btn btn-secondary mx-1 my-3 px-3"
              onClick={handleCardFlip}
            >
              Flip
            </button>
            {cardFlip && (
              <button
                type="button"
                className="btn btn-primary mx-1 my-3 px-3"
                onClick={handleNextCard}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </>
    )
  );
}

export default StudyCardsGood;
