import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Login from "../Login/Login";

export default function Dashboard() {
  const { token } = useContext(AppContext);

  if (!token) {
    return <Login />;
  }
  return <h2>Dashboard</h2>;
}
