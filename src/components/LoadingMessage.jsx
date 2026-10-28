import React from 'react';

export default function LoadingMessage() {
  return (
    <p className="loading-message" role="status">
      <span className="spinner" aria-hidden="true"></span>
      Loading weather…
    </p>
  );
}
