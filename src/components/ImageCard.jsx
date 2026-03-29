import { useState } from "react";

function ImageCard({ url, breed }) {
  const [votes, setVotes] = useState(0);

  return (
    <div className="card">
      <img src={url} alt={breed} loading="lazy" />
      <div className="card-footer">
        <div className="vote-buttons">
          <button className="btn-hot" onClick={() => setVotes(v => v + 1)}>🔥 Hot</button>
          <button className="btn-not" onClick={() => setVotes(v => v - 1)}>❌ Not</button>
        </div>
        <span className="vote-score">{votes}</span>
      </div>
    </div>
  );
}

export default ImageCard;