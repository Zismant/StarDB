export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  async getResource(url) {
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


  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  }

  async getAllPerson() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }

  _transformPerson = (person) => {

    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    };
  }


  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllPlanets() {
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


  async getStarship(id) {
    const ship = await this.getResource(`/starships/${id}/`)
    return this._transformStarship(ship);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  _transformStarship = (starship) => {

    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costIdCredits: starship.costIdCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapasity: starship.cargoCapasity,
    };
  }

}
