import React, { Component }  from 'react';

import './people-page.css';
import ItemList from "../../item-list";
import PersonDetails from "../../person-details";
import ErrorIndicator from "../../error-iddicator";

export default class PeoplePage extends Component {

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
    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    )
  }
}