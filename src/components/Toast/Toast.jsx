import React from "react";
import "./toast.scss";

function Toast({ txt, colorCode }) {
  return <div className={"toast " + colorCode}>{txt}</div>;
}

export default Toast;
