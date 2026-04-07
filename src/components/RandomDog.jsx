import { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_DOG_API_BASE_URL || "https://dog.ceo/api";

function RandomDog() {
  const [image, setImage] = useState("");
  const [breedName, setBreedName] = useState("");

  function fetchRandom() {
    fetch(`${API_BASE_URL}/breeds/image/random`)
      .then(res => res.json())
      .then(data => {
        setImage(data.message);
        const parts = data.message.split("/");
        const raw = parts[4];
        const name = raw
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setBreedName(name);
      });
  }

  return (
    <div className="random-section">
      <h2> Random Dog Generator</h2>
      {image && (
        <>
          <img className="random-img" src={image} alt={breedName} />
          <p className="breed-label">🐾 {breedName}</p>
        </>
      )}
      <button className="btn-random" onClick={fetchRandom}>
         Surprise Me !!!
      </button>
    </div>
  );
}

export default RandomDog;