import { useState, useEffect, useRef, useCallback } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
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
  const [hasMore, setHasMore] = useState(true);
  const cache = useRef(new Map());
  const abortController = useRef(null);

  const loadMoreImages = useCallback(async () => {
    if (!breed || loadingMore) return;

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

        // Stop infinite scroll if we get fewer images than requested
        if (nextImages.length < BATCH_SIZE) {
          setHasMore(false);
        }

        return merged;
      });
    } catch (err) {
      setError("Could not load more images. Try again.");
      console.error(err);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [breed, loadingMore]);

  // Use infinite scroll hook
  const observerRef = useInfiniteScroll(loadMoreImages, hasMore);

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
      setHasMore(true);

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

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading adorable dogs... 🐕</div>}
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

      {/* Infinite scroll trigger */}
      {hasMore && images.length > 0 && (
        <div ref={observerRef} className="loading-trigger">
          {loadingMore && <div className="loading-message">Loading more dogs... 🐕</div>}
        </div>
      )}

      {!hasMore && images.length > 0 && (
        <div className="end-message">🐾 You've seen all the {breed} photos! 🐾</div>
      )}

      <ImageModal
        image={selectedImage}
        breed={breed}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

export default ImageGallery;