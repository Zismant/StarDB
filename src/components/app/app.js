import React from "react";

import './app.css'
import Header from "../header";
import ItemList from "../item-list";

import RandomPlanet from "../random-planet/random-planet";

const App = () => {
  return (
    <div className="stardb-app">
      <Header />
      <RandomPlanet />
      <ItemList />
    </div>
  );

}
export default App;