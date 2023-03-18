import React, {Component, Fragment} from "react";

import './item-details.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-iddicator";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  )
};

export {
  Record
}

export default  class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.onLoading();
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item),
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

    const { loading, item,  error, image } = this.state;

    if (!item) {
      return <span>Selected a item from a list</span>
    }

    const {name} = item;
    const itemDetailsView =
      (
        <Fragment>
          <img className="person-image"
               src={image}
               alt="person-image"/>
          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              {
                React.Children.map(this.props.children, (child)=> {
                  return React.cloneElement(child, { item });
                })
              }
            </ul>
            <ErrorButton />
          </div>
        </Fragment>
      );


    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const itemDetails = !(error || loading) ? itemDetailsView : null;



    return (
      <div className="person-details card">
        {itemDetails}
        {spinner}
        {errorMessage}
      </div>
    );
  }

}

