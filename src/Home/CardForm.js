import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateCard, readCard, createCard } from "../utils/api";

function CardForm() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [currentCard, setCurrentCard] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleFrontChange = (event) => {
    setFront(event.target.value);
  };
  const handleBackChange = (event) => {
    setBack(event.target.value);
  };

  useEffect(() => {
    setFront(currentCard.front);
    setBack(currentCard.back);
  }, [setFront, setBack, currentCard.front, currentCard.back]);

  useEffect(() => {
    async function getCard() {
      const response = await readCard(cardId);
      setCurrentCard(response);
    }
    if (cardId) {
      getCard();
    }
  }, [cardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cardId) {
      await updateCard({ ...currentCard, front, back });
      history.push(`/decks/${deckId}`);
    } else {
      await createCard(deckId, {
        front,
        back,
      });
      setFront("");
      setBack("");
    }
  };

  return (
    <>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <label className="font-weight-bold" name="front" id="front">
          Front:
          <textarea
            style={{ width: "100%" }}
            value={front}
            placeholder="Front side of card."
            onChange={handleFrontChange}
          ></textarea>
        </label>
        <label className="font-weight-bold" name="back" id="back">
          Back:
          <textarea
            style={{ width: "100%" }}
            value={back}
            placeholder="Back side of card."
            onChange={handleBackChange}
          ></textarea>
        </label>
        <div className="my-3">
          <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-3">
            {cardId ? "Cancel" : "Done"}
          </Link>
          <button className="btn btn-primary" type="submit">
            {cardId ? "Submit" : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}

export default CardForm;
