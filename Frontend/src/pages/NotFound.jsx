import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        color: "#333",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "36px", color: "#FF9933" }}>404</h1>
      <p style={{ fontSize: "18px", color: "#000" }}>
        Page not found.
      </p>
    </div>
  );
};

export default NotFound;
