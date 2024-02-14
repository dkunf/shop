import React from "react";
import "./toast.scss";

function Toast({ txt }) {
  return <div className="toast">{txt}</div>;
}

export default Toast;
