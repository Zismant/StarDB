import React, {Component, Fragment} from "react";

import './person-details.css';
import SwapiService from "../../services/swapi-serwices";
import Spinner from "../spinner";
import ErrorIndicator from "../error-iddicator";

export default  class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.onLoading();
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;

    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({
          person,
          loading: false,
          error: false,
        });
      })
      .catch(this.onError);
  }

  onLoading = () => {
    this.setState({
      loading: true,
      error: false,
    });
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  }

  render() {

    const { loading, person, error } = this.state;

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const personDetails = !(error || loading) ? <PersonDetailsView person={person}/> : null;

    if (!person) {
      return <span>Selected a person from a list</span>
    }

    return (
      <div className="person-details card">
        {personDetails}
        {spinner}
        {errorMessage}
      </div>
    );
  }

}

const PersonDetailsView = ( {person} ) => {
  const {id, name, gender, birthYear, eyeColor } = person;

  return (

    <Fragment>
      <img className="person-image"
           src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
           alt="person-image"/>
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eya Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}