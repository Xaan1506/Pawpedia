import { useState } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { FavoritesProvider } from "./components/FavoritesContext";
import ThemeToggle from "./components/ThemeToggle";
import BreedSelector from "./components/BreedSelector";
import ImageGallery from "./components/ImageGallery";
import RandomDog from "./components/RandomDog";
import "./App.css";

function App() {
  const [selectedBreed, setSelectedBreed] = useState("");

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <header className="header">
          <h1 className="brand-title">
            <span>Pawpedia</span>
            <span className="logo-icon" aria-hidden="true">🐾</span>
          </h1>
          <ThemeToggle />
        </header>

        <div className="app">
          <div className="section-box">
            <RandomDog />
          </div>

          <div className="section-box controls-panel">
            <BreedSelector onBreedChange={setSelectedBreed} />
          </div>

          <div className="section-box">
            {selectedBreed && (
              <h2 className="section-title">
                Photos of <span>{selectedBreed}</span>
              </h2>
            )}
            <ImageGallery breed={selectedBreed} />
          </div>
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;