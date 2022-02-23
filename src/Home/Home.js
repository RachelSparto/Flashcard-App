import React from "react";
import { Link } from "react-router-dom";

import Decks from "./Decks";

function Home() {
  return (
    <div>
      <div>
        {/*Create Deck button is shown, and clicking it brings the user to the Create Deck screen.*/}
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary px-3 py-3">
            + Create Deck
          </button>
        </Link>
      </div>
      <div>
        <Decks />
      </div>
    </div>
  );
}

export default Home;
