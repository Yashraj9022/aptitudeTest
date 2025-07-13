import React from "react";
import "./Popup.css";

const Popup = ({ message, type, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className={`popup-content ${type}`}>
        <h3>{type === "success" ? "✅ Success" : "❌ Error"}</h3>
        <p>{message}</p>
        <button onClick={onClose} className="popup-close-btn">Close</button>
      </div>
    </div>
  );
};

export default Popup;
