import React, {Component} from "react";

import "./item-list.css";
import SwapiService from "../../services/swapi-serwices";
import Spinner from "../spinner";
import ErrorIndicator from "../error-iddicator";

export default class ItemList extends Component {

  state = {
    itemList: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    const { getData } = this.props;

    this.onLoading();
    getData()
      .then((itemList) => {
        this.setState({
          itemList,
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
    return arr.map(( item ) => {

      const { id } = item;

      const label = this.props.renderItem(item);

      return (
        <li className="list-group-item"
            key={id}
            onClick={ () => this.props.onItemSelected(id) }>
          {label}
        </li>
      );
    });
  }

  render() {

    const { itemList,  error } = this.state;

    if (!itemList && !error) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    const items = this.renderItem(itemList);


    return(
        <ul className="item-list list-group">
          {items}
        </ul>
    );
  }
}
