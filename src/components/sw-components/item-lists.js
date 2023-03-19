import React from "react";
import withData from "../hoc-helper";
import SwapiService from "../../services/swapi-serwices";
import ItemList from "../item-list";

const swapiService = new SwapiService();

const {
  getAllPeople,
  getAllPlanets,
  getAllStarships,
} = swapiService;

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  }
};

const renderName = ({name}) => <span>{name}</span>;
const renderModelAndName = ( {name, model} ) => <span>{name} (model)</span>;

const PersonList = withData(withChildFunction(ItemList, renderName), getAllPeople);
const PlanetList = withData(withChildFunction(ItemList, renderName), getAllPlanets);
const StarshipList = withData(withChildFunction(ItemList, renderModelAndName), getAllStarships);

export {
  PersonList,
  PlanetList,
  StarshipList,
}

