import React from "react";
import { mockData } from "../../mockData";
import "./main.scss";
import { Card } from "../Card/Card";

function Main() {
  console.log(mockData);

  return (
    <main className="main-container">
      {/* vow, react array -> eilutes */}
      {mockData.map((el) => (
        <Card
          src={el.src || ""}
          key={el.title}
          title={el.title}
          description={el.description}
        />
      ))}
      {/* Pasirodo react supranta masyva paduodama 
      jam is js kaip atskyras eilutes */}
      {/*   PILNAS VARIANTAS:
       {mockData.map((el) => {
        return (
          <Card key={el.title} title={el.title} description={el.description} />
        );
      })} */}
    </main>
  );
}

export default Main;
