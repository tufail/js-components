'use strict';
import Component from '../lib/component.js';
import Fetch from 'whatwg-fetch';

export default class Roomslist extends Component {
    constructor() {
      super({
          element: document.querySelector('[room-listing]')
      });
      this.rooms =  new Promise((resolve, reject) => {
      fetch('https://rt3api-prd.ttaws.com/hotels/rooms.json?hotel_id=KEY24N&portal_id=24northhotel&locale=en&currency=USD&ip_address=124.123.57.31&arrival_date_0=2018-09-30&departure_date_0=2018-10-01&adults_0=2&children_0=0&rooms=1')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        return resolve(json);
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    });
    }

    // /**
    //  * React to state changes and render the component's HTML
    //  *
    //  * @returns {void}
    //  */
    render() {
        this.rooms.then((successMessage) => {
        const createString = require('../templates/roomlist-template');
          for (var value of successMessage.rooms) {
            this.element.innerHTML =  this.element.innerHTML + createString(value);
          }

        });

    }
}
