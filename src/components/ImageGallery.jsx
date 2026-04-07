import { useState, useEffect, useRef } from "react";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";

const BATCH_SIZE = 9;
const API_BASE_URL = process.env.REACT_APP_DOG_API_BASE_URL || "https://dog.ceo/api";

function ImageGallery({ breed }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const cache = useRef(new Map());
  const abortController = useRef(null);

  useEffect(() => {
    if (!breed) return;

    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;

    async function loadImages() {
      setLoading(true);
      setError("");
      setImages([]);

      if (cache.current.has(breed)) {
        setImages(cache.current.get(breed));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/breed/${breed}/images/random/${BATCH_SIZE}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (!data.message) throw new Error("No images returned");
        cache.current.set(breed, data.message);
        setImages(data.message);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load images. Try again.");
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadImages();

    return () => controller.abort();
  }, [breed]);





  async function handleLoadMore() {
    if (!breed) return;
    setLoadingMore(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/breed/${breed}/images/random/${BATCH_SIZE}`
      );
      const data = await response.json();
      if (!data.message) throw new Error("No images returned");

      setImages(prev => {
        const nextImages = data.message.filter(url => !prev.includes(url));
        const merged = [...prev, ...nextImages];
        cache.current.set(breed, merged);
        return merged;
      });
    } catch (err) {
      setError("Could not load more images. Try again.");
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <div className="gallery">
        {images.map(url => (
          <ImageCard
            key={url}
            url={url}
            breed={breed}
            onClick={() => setSelectedImage(url)}
          />
        ))}
      </div>
      <button
        className="btn-load"
        onClick={handleLoadMore}
        disabled={loadingMore}
      >
        {loadingMore ? "Loading more..." : "Load More 🐾"}
      </button>
      <ImageModal
        image={selectedImage}
        breed={breed}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

export default ImageGallery;