import React from "react";
import { mockData } from "../../mockData";
import "./main.scss";
import { Card } from "../Card/Card";

class Main extends React.Component {
  constructor() {
    super();
    // dabar jeigu data pasikeis tai MainClas persipies
    this.state = {
      data: mockData,
    };
  }

  render() {
    const { data } = this.state;

    const handleSortData = (isAscending = 1) => {
      const sortedData = data.sort((a, b) => {
        if (a.title > b.title) return isAscending;
        if (a.title < b.title) return -isAscending;
        return 0;
      });
      this.setState({
        data: sortedData,
      });
    };
    //next i6kelti button i atskyra komponenta
    return (
      <main className="main-container">
        <div className="filtrai">
          <button onClick={() => handleSortData(1)}>Sort A-Z</button>
          <button onClick={() => handleSortData(-1)}>Sort Z-A</button>
        </div>

        {data.map((el) => (
          <Card
            src={el.src || ""}
            key={el.title}
            title={el.title}
            description={el.description}
          />
        ))}
      </main>
    );
  }
}

export default Main;
