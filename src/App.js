import { useState } from "react";
import BreedSelector from "./components/BreedSelector";
import ImageGallery from "./components/ImageGallery";
import RandomDog from "./components/RandomDog";
import "./App.css";

function App() {
  const [selectedBreed, setSelectedBreed] = useState("");

  return (
    <>
      <header className="header">
        <h1>Pawpedia 🐾</h1>
        <p>Explore every dog breed on the planet</p>
      </header>

      <div className="app">

        <div className="section-box">
          <RandomDog />
        </div>

        <div className="section-box controls-panel">
          <BreedSelector onBreedChange={setSelectedBreed} />
        </div>

        {selectedBreed && (
          <h2 className="section-title">
            Photos of <span>{selectedBreed}</span>
          </h2>
        )}

        <ImageGallery breed={selectedBreed} />

      </div>
    </>
  );
}

export default App;