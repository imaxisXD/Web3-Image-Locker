import React from "react";

export default function GifContainer({ source }) {
  return (
    <div className="gif-grid">
      {source.map((gif) => (
        <div className="gif-item" key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  );
}
