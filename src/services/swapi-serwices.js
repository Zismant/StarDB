export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url} `);

    if (!res.ok) {
      throw new Error(`Could not fetch777 ${url}`+`received333 ${res.status})`);
    }
    return await res.json();
  };


  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}/`);
  }


  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results;
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}/`);
  }


  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results;
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }

}

const swapi = new SwapiService();


swapi.getPlanet(3).then( (planet) => {
  console.log(planet);
})

swapi.getAllStarships().then( (data) => {
  data.forEach( (item) => {
    console.log(item.name);
  });
})