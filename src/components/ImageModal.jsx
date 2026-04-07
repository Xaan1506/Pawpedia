import { useState } from "react";

function ImageModal({ image, breed, onClose }) {
  const [votes, setVotes] = useState(0);

  if (!image) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={image} alt={breed} className="modal-image" />
        <div className="modal-footer">
          <div className="vote-buttons">
            <button className="btn-hot" onClick={() => setVotes(v => v + 1)}>🔥 Hot</button>
            <button className="btn-not" onClick={() => setVotes(v => v - 1)}>❌ Not</button>
          </div>
          <span className="vote-score">{votes}</span>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;