import React, {Component} from "react";

import './app.css'

import Header from "../header";
import RandomPlanet from "../random-planet/random-planet";
import ErrorIndicator from "../error-iddicator";
import ErrorBaundry from "../error-baundry";
import Row from "../row";
import ErrorButton from "../error-button";
import {PlanetList, PersonList, StarshipList, PersonDetails, StarshipDetails, PlanetDetails} from "../sw-components";

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

    const personDetails = (
      <ErrorBaundry>

      </ErrorBaundry>
    );

    const starshipDetails = (
     <ErrorBaundry>

     </ErrorBaundry>
    );

    return (
     <ErrorBaundry>
       <div className="stardb-app">
         {/*<Header/>*/}
         {/*{planet}*/}
         {/*<div className="row mb2 button-row">*/}
         {/*  <button*/}
         {/*    className="toggle-planet btn btn-warning btn-lg"*/}
         {/*    onClick={this.toggleRandomPlanet}>*/}
         {/*    Toggle random Planet*/}
         {/*  </button>*/}
         {/*  <ErrorButton />*/}
         {/*</div>*/}

         {/*<ErrorBaundry>*/}
         {/*  <PlanetList>*/}
         {/*    { ({name}) => <span>{name}</span> }*/}
         {/*  </PlanetList>*/}
         {/*</ErrorBaundry>*/}

         <ErrorBaundry>
           <PersonDetails itemId={5}/>
         </ErrorBaundry>

         <ErrorBaundry>
           <PlanetDetails itemId={3} />
         </ErrorBaundry>

         <ErrorBaundry>
           <StarshipDetails itemId={9} />
         </ErrorBaundry>




         <ErrorBaundry>
           <StarshipList />
         </ErrorBaundry>


         {/*<Row*/}
         {/* left={personDetails}*/}
         {/* right={starshipDetails} />*/}

       </div>
     </ErrorBaundry>
    );
  }
}
