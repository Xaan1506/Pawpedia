import { useState, useEffect, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";

const API_BASE_URL = process.env.REACT_APP_DOG_API_BASE_URL || "https://dog.ceo/api";

function BreedSelector({ onBreedChange }) {
  const [breeds, setBreeds] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const breedList = useMemo(() => Object.keys(breeds), [breeds]);

  // Debounce the search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const suggestions = useMemo(() => {
    const query = debouncedSearchTerm.trim().toLowerCase();
    if (!query) return [];
    return breedList
      .filter(breed => breed.toLowerCase().includes(query))
      .slice(0, 6);
  }, [breedList, debouncedSearchTerm]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/breeds/list/all`)
      .then(res => res.json())
      .then(data => {
        setBreeds(data.message);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
        setMessage('Failed to load breeds. Please refresh the page.');
        setIsLoading(false);
      });
  }, []);

  function formatBreed(value) {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function handleSuggestionClick(breed) {
    setSearchTerm(formatBreed(breed));
    onBreedChange(breed);
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
      setSearchTerm(formatBreed(match));
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
        <div className="search-input-wrapper">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setMessage("");
            }}
            placeholder={isLoading ? "Loading breeds..." : "Search dog breed..."}
            className="search-input"
            disabled={isLoading}
          />
          {suggestions.length > 0 && !isLoading && (
            <ul className="search-suggestions" role="listbox">
              {suggestions.map(breed => (
                <li key={breed}>
                  <button
                    type="button"
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(breed)}
                  >
                    {breed.charAt(0).toUpperCase() + breed.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>

      {message && <p className="search-message">{message}</p>}
    </>
  );
}

export default BreedSelector;