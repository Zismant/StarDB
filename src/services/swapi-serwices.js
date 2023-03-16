export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url} `);

    if (!res.ok) {
      throw new Error(`Could not fetch777 ${url}`+`received333 ${res.status})`);
    }
    return await res.json();
  };

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return  item.url.match(idRegExp)[1];
  }


  getPeople = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPeople(person);
  }

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPeople);
  };

  _transformPeople = (person) => {

    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    };
  }


  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }

  _transformPlanet = (planet) => {

    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  }


  getStarship = async (id) => {
    const ship = await this.getResource(`/starships/${id}/`)
    return this._transformStarship(ship);
  }

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  _transformStarship = (starship) => {

    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costIdCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapasity: starship.cargo_capasity,
    };
  }

}
