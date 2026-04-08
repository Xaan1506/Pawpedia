import { memo } from "react";
import { useFavorites } from "./FavoritesContext";

function ImageCard({ url, breed, onClick }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(url);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the image click
    if (favorite) {
      // Find the favorite ID to remove
      // For simplicity, we'll use the URL as identifier
      removeFromFavorites(url);
    } else {
      addToFavorites(url, breed);
    }
  };

  return (
    <div className="card">
      <img
        src={url}
        alt={breed}
        loading="lazy"
        decoding="async"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      />
      <button
        className={`favorite-btn ${favorite ? 'favorited' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        title={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default memo(ImageCard);