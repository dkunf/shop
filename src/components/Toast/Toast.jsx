import React from "react";
import "./toast.scss";

function Toast({ txt, colorCode }) {
  console.log("Toast");
  if (txt) return <div className={"my-toast " + colorCode}>{txt}</div>;
}

export default Toast;
