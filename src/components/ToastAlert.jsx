import { useState } from "react";

export default function ToastAlert({ type, message, showAleart }) {
  let display;
  if (showAleart !== true) {
    console.log(showAleart);
    display = "none";
  }
  const closeButtonHandler = (e) => {
    e.target.parentElement.parentElement.style.display = "none";
  };

  return (
    <div className={`alert-box ${type}`} style={{ display: `${display}` }}>
      <span>
        <button className="closebtn" onClick={closeButtonHandler}>
          X
        </button>
      </span>
      <p>{message}</p>
    </div>
  );
}
