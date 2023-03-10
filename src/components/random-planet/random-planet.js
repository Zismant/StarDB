import React, {Component} from 'react';

import './random-planet.css';

export default class extends Component {

  render() {

    return(
      <div className='random-planet jumbotron rounded'>
        <img className='planet-image'
             src="http://custom.swcombine.com/static/8/4/34-13715-1558966795-large.png"
             alt="planet"/>
        <div>
          <h4>Mercury</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{"45545454"}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{"45"}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{"333"}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

