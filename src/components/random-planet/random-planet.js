import React, {Component, Fragment} from 'react';

import SwapiService from "../../services/swapi-serwices";

import './random-planet.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-iddicator";

export default class RandomPlanet extends Component {

  swapiServise = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  }

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
      this.setState({
        planet,
        loading: false,
        error: false,
      });
  }

  onError = () => {
      this.setState( {
        error: true,
        loading: false,
      });
  }

  updatePlanet() {
    const id = Math.floor( Math.random() * 24 + 2);
    this.swapiServise
      .getPlanet(id)
      .then( this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { loading, planet, error } = this.state;

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <PlanetView planet={planet} /> : null;

    return(
      <div className='random-planet jumbotron rounded'>
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ( {planet} ) => {
  const  {id, name, population, rotationPeriod, diameter} = planet;
  return (
    <Fragment>
      <img className='planet-image'
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
           alt="planet"/>
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}