import { memo } from "react";

function ImageCard({ url, breed, onClick }) {
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
    </div>
  );
}

export default memo(ImageCard);