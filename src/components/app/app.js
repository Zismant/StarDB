import React, {Component} from "react";

import './app.css'
import Header from "../header";
import RandomPlanet from "../random-planet/random-planet";
import ErrorIndicator from "../error-iddicator";
import SwapiService from "../../services/swapi-serwices";
import ErrorBaundry from "../error-baundry";
import Row from "../row";
import ItemDetails from "../item-details";
import {Record} from "../item-details/item-details";
import PeoplePage from "../people-page";
import ItemList from "../item-list";
import ErrorButton from "../error-button";

export default class App extends Component {
  swapiService = new SwapiService();

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

    const {getPeople, getStarship, getPersonImage,
          getStarshipImage, getAllPeople} = this.swapiService;

    if (hasError) {
      return <ErrorIndicator />;
    }
    const planet = showRandomPlanet ? <RandomPlanet /> : null;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPeople}
        getImageUrl={getPersonImage}>

        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eay Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>

        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    return (
     <ErrorBaundry>
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
         <ItemList

           onItemSelected={() => {}}>

           { ({name}) => <span>{name}</span> }
         </ItemList>

         <Row
          left={personDetails}
          right={starshipDetails} />

       </div>
     </ErrorBaundry>
    );
  }
}
