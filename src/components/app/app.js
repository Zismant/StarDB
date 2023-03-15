import React, {Component} from "react";

import './app.css'
import Header from "../header";
import RandomPlanet from "../random-planet/random-planet";
import ErrorButton from "../error-button";
import PeoplePage from "../error-button/people-page";
import ErrorIndicator from "../error-iddicator";


export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false,
  }

  componentDidCatch() {
    this.setState({hasError: true});
  }

  toggleRandomPlanet = () => {
    this.setState( ({ showRandomPlanet }) => {
      return {
        showRandomPlanet: !showRandomPlanet,
      };
    });
  }

  render() {

    const { showRandomPlanet, hasError } = this.state;

    if (hasError) {
      return <ErrorIndicator />;
    }
    const planet = showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <div className="stardb-app">
        <Header/>
        {planet}
        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle random Planet
          </button>
          <ErrorButton />
        </div>
        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  }
}
