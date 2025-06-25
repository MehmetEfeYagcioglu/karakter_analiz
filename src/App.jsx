// src/App.jsx
import { useState } from "react";
import Home from "./components/Home";
import Game from "./components/Game";
import React from "react";

function App() {
  const [player, setPlayer] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {!player ? (
        <Home onStart={(name) => setPlayer(name)} />
      ) : (
        <Game playerName={player} />
      )}
    </div>
  );
}

export default App;
