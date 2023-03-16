import React, { Component }  from 'react';

import './people-page.css';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-iddicator";
import SwapiService from "../../services/swapi-serwices";
import Row from "../row";



export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 2,
    hasError: false,
  }

  componentDidCatch() {
    this.setState( {hasError: true});
  }

  onPersonSelected = (id) => {
    this.setState( {
      selectedPerson: id,
    });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <ErrorIndicator />
    }
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`} />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return (
      <Row left={itemList} right={personDetails} />
    )
  }
}