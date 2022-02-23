import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../utils/api";

function DeckForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentDeck, setCurrentDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  useEffect(() => {
    setName(currentDeck.name);
    setDescription(currentDeck.description);
  }, [setName, setDescription, currentDeck.name, currentDeck.description]);

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setCurrentDeck(response);
    }
    if (deckId) {
      getDeck();
    }
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (deckId) {
      await updateDeck({ ...currentDeck, name, description });
      history.push(`/decks/${currentDeck.id}`);
    } else {
      await createDeck({ name, description });
      history.push(`${currentDeck.length + 1}`);
    }
  };

  return (
    <>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <label className="font-weight-bold" name="front" id="front">
          Name:
          <textarea
            style={{ width: "100%" }}
            value={name}
            placeholder="Deck Name"
            onChange={handleNameChange}
          ></textarea>
        </label>
        <label className="font-weight-bold" name="back" id="back">
          Description:
          <textarea
            style={{ width: "100%" }}
            value={description}
            placeholder="Brief description of the deck"
            onChange={handleDescriptionChange}
          ></textarea>
        </label>
        <div className="my-3">
          {deckId ? (
            <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-3">
              Cancel
            </Link>
          ) : (
            <Link to="/" className="btn btn-secondary mr-3">
              Cancel
            </Link>
          )}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default DeckForm;
