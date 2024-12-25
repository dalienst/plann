import React from "react";

function LoadingSpinner() {
  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Semi-transparent background
        zIndex: 1050, // Ensures it appears on top of other content
      }}
    >
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </section>
  );
}

export default LoadingSpinner;
