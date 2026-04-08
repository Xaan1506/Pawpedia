import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('pawpedia-favorites', []);

  const addToFavorites = (imageUrl, breed) => {
    const newFavorite = { url: imageUrl, breed, id: Date.now() };
    setFavorites(prev => [...prev, newFavorite]);
  };

  const removeFromFavorites = (imageUrl) => {
    setFavorites(prev => prev.filter(fav => fav.url !== imageUrl));
  };

  const isFavorite = (imageUrl) => {
    return favorites.some(fav => fav.url === imageUrl);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}