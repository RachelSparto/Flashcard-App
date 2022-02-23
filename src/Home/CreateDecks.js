import React from "react";
import { Link } from "react-router-dom";
import DeckForm from "./DeckForm";

function CreateDecks() {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-gradient-dark">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <DeckForm />
    </>
  );
}

export default CreateDecks;
