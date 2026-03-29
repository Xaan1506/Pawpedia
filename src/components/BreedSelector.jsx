import { useState, useEffect } from "react";

function BreedSelector({ onBreedChange }) {
  const [breeds, setBreeds] = useState({});
  const [selected, setSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(data => setBreeds(data.message));
  }, []);

  function handleChange(e) {
    setSelected(e.target.value);
    onBreedChange(e.target.value);
    setMessage("");
  }

  function handleSearch() {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      setMessage("Please enter a breed name to search.");
      return;
    }

    const match = Object.keys(breeds).find(breed =>
      breed.toLowerCase().includes(query)
    );

    if (match) {
      setSelected(match);
      onBreedChange(match);
      setMessage("");
    } else {
      setMessage(`No breed found for "${searchTerm}".`);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  return (
    <>
      <form className="search-row" onSubmit={handleSubmit}>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search dog breed..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <select onChange={handleChange} value={selected}>
        <option value="">🐾 Select a breed...</option>
        {Object.keys(breeds).map(breed => (
          <option key={breed} value={breed}>
            {breed.charAt(0).toUpperCase() + breed.slice(1)}
          </option>
        ))}
      </select>

      {message && <p className="search-message">{message}</p>}
    </>
  );
}

export default BreedSelector;