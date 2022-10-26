import { useState, useEffect } from "react";

export default function ToastAlert({ message, type, showAleart }) {
  const [showAlert, setShowAlert] = useState(showAleart);

  const closeButtonHandler = () => {
    console.log("clicked");
    setShowAlert((prev) => !prev);
  };
  useEffect(() => {
    setShowAlert(showAleart);
  }, [showAleart, message, type]);

  if (showAlert) {
    return (
      <div className={`alert-box ${type}`}>
        <span>
          <button className="closebtn" onClick={closeButtonHandler}>
            X
          </button>
        </span>
        <p>{message}</p>
      </div>
    );
  } else return null;
}
