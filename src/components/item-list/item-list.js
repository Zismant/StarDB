import React, {Component, Fragment} from "react";

import "./item-list.css";
import SwapiService from "../../services/swapi-serwices";
import Spinner from "../spinner";
import ErrorIndicator from "../error-iddicator";

export default class ItemList extends Component {
  swapiService = new SwapiService();

  state = {
    peopleList: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.onLoading();
    this.swapiService
      .getAllPerson()
      .then((peopleList) => {
        this.setState({
          peopleList
        });
      })
      .catch(this.onError);

  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  }

  onLoading = () => {
    this.setState({
      loading: true,
      error: false,
    });
  }

  renderItem(arr) {
    return arr.map(( {id, name} ) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={ () => this.props.onItemSelected(id) }>
          {name}
        </li>
      );
    });
  }

  render() {
    console.log(this.state);

    const { peopleList, loading, error } = this.state;
    if (!peopleList) {
      return <Spinner />;
    }
    const items = this.renderItem(peopleList);

    const errorMessage = error ? <ErrorIndicator /> : null;


    return(
      <Fragment>
        <ul className="item-list list-group">
          {items}
        </ul>
        {errorMessage}
      </Fragment>
    );
  }
}
