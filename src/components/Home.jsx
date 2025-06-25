import { useState } from "react";
import React from "react";


function Home({ onStart }) {
  const [name, setName] = useState("");

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Karakter Analiz Oyunu</h1>
      <input
        type="text"
        className="border p-2 w-full rounded mb-4"
        placeholder="Adını gir..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={!name}
        onClick={() => onStart(name)}
      >
        Oyuna Başla
      </button>
    </div>
  );
}

export default Home;
