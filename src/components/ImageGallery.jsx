import { useState, useEffect } from "react";
import ImageCard from "./ImageCard";

function ImageGallery({ breed }) {
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(9);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!breed) return;
    setLoading(true);
    setVisible(9);
    fetch(`https://dog.ceo/api/breed/${breed}/images`)
      .then(res => res.json())
      .then(data => {
        setImages(data.message);
        setLoading(false);
      });
  }, [breed]);

  if (!breed) {
    return (
      <div className="empty-state">
        <span className="emoji">🐶</span>
        <p>Pick a breed to see photos!</p>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Fetching good boys... 🐾</div>;
  }

  return (
    <div>
      <div className="gallery">
        {images.slice(0, visible).map((url, i) => (
          <ImageCard key={i} url={url} breed={breed} />
        ))}
      </div>
      {visible < images.length && (
        <button className="btn-load" onClick={() => setVisible(v => v + 9)}>
          Load More 🐾
        </button>
      )}
    </div>
  );
}

export default ImageGallery;